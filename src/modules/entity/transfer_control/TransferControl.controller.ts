import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransferControlService } from './TransferControl.service';
import { TransferControl } from './TransferControl.entity';
import { ApiTags } from '@nestjs/swagger';
import { getFormattedTimestampTID } from 'src/common/utils/date.format';
import { TransferStateCacheService } from 'src/common/cache/transfercontrol.cache.service';
import { MqttPublishService } from 'src/common/adapter/mqtt/mqtt.publisher.service';
import { buildSuccessMessageFromJson } from 'src/common/utils/message.format';
import { BaseException } from 'src/common/exceptions/base.exception';
import { ResponseManager } from 'src/common/handler/response.manager';

@ApiTags('transfercontrol')
@Controller('transfercontrol')
export class TransferControlController {
  constructor(
    private readonly transfercontrolService: TransferControlService,
    private readonly transferCache: TransferStateCacheService,
    private readonly mqttPublisher: MqttPublishService,
    private readonly responseManager: ResponseManager,
  ) {}

  @Get()
  async findAll(): Promise<TransferControl[]> {
    return this.transfercontrolService.findAll();
  }

  @Post()
  async create(
    @Body() transferControl: TransferControl,
  ): Promise<string | TransferControl> {
    try {
      for (const key in transferControl) {
        if (transferControl[key] === undefined || transferControl[key] === '') {
          transferControl[key] = null;
        }
      }

      const transactionId = getFormattedTimestampTID();
      transferControl.transfer_id =
        transferControl.transfer_id || transactionId;

      transferControl.priority_no = parseInt(
        transferControl.priority_no.toString(),
        10,
      );
      const message = buildSuccessMessageFromJson({
        header: {
          requestId: 'ui',
          workId: 'create_transfer_control',
          transactionId: transactionId,
        },
        dataSet: {
          transferId: transferControl.transfer_id,
          transferSt: transferControl.transfer_st ?? '',
          transferPriority: transferControl.priority_no ?? '',
          transferRobot: transferControl.assigned_robot_id ?? '',
          transferSource: transferControl.source_port_id ?? '',
          transferDestination: transferControl.destination_port_id,
        },
      });

      this.mqttPublisher.publishInternal('web/transfercontrol', message, 0);
      const result = await this.responseManager.waitFor(transactionId);
      return result;
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while creating transfer control',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }

  @Post('search')
  async searchTasks(
    @Body() transferDto: { transfer_st: string; site_cd: string },
  ): Promise<any[]> {
    try {
      return this.transfercontrolService.searchTasks(
        transferDto.transfer_st,
        transferDto.site_cd,
      );
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while searching tasks',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }
}
