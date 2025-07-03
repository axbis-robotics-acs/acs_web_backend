import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransferControlService } from './TransferControl.service';
import { TransferControl } from './TransferControl.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({
    description: 'Create a new transfer control',
    required: true,
    schema: {
      example: {
        transfer_id: '',
        transfer_status_tx: 'READY',
        transfer_tp: 'TRANSFER',
        priority_no: 10,
        assigned_robot_id: '',
        source_port_id: 'P1-1',
        destination_port_id: 'P1-2',
        site_cd: 'HU',
      },
    },
  })
  async create(
    @Body() transferControl: TransferControl,
  ): Promise<string | TransferControl> {
    console.log('Received transfer control:', transferControl);
    try {
      for (const key in transferControl) {
        if (transferControl[key] === undefined || transferControl[key] === '') {
          transferControl[key] = null;
        }
      }
      const transactionId = getFormattedTimestampTID();
      transferControl.priority_no = parseInt(
        transferControl.priority_no.toString(),
        10,
      );

      transferControl.transfer_id =
        transferControl.transfer_id ?? transactionId;
      transferControl.transfer_status_tx =
        transferControl.transfer_status_tx ?? 'READY';
      transferControl.transfer_tp = transferControl.transfer_tp ?? 'TRANSFER';
      transferControl.priority_no = transferControl.priority_no ?? 10;
      transferControl.assigned_robot_id =
        transferControl.assigned_robot_id ?? '';
      transferControl.source_port_id = transferControl.source_port_id ?? '';
      transferControl.destination_port_id =
        transferControl.destination_port_id ?? '';

      const result = await this.transfercontrolService.create(transferControl);

      // 백엔드 통신용

      // const message = buildSuccessMessageFromJson({
      //   header: {
      //     requestId: 'ui',
      //     workId: 'create_transfer_control',
      //     transactionId: transactionId,
      //     siteId: transferControl.site_cd ?? 'HU',
      //     userId: 'administrator',
      //   },
      //   dataSet: {
      //     transferId: transferControl.transfer_id ?? transactionId,
      //     transferSt: transferControl.transfer_status_tx ?? 'READY',
      //     transferTp: transferControl.transfer_tp ?? 'TRANSFER',
      //     transferPriority: transferControl.priority_no ?? '',
      //     transferRobot: transferControl.assigned_robot_id ?? '',
      //     transferSource: transferControl.source_port_id ?? '',
      //     transferDestination: transferControl.destination_port_id ?? '',
      //   },
      // });

      // this.mqttPublisher.publishInternal('web/transfercontrol', message, 0);

      // const result = await this.responseManager.waitFor(transactionId);

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
    @Body() transferDto: { transfer_status_tx: string; site_cd: string },
  ): Promise<any[]> {
    try {
      return this.transfercontrolService.searchTasks(
        transferDto.transfer_status_tx,
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
