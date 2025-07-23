import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { TransferControlService } from './TransferControl.service';
import { TransferControl } from './TransferControl.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { getFormattedTimestampTID } from 'src/common/utils/date.format';
import { TransferStateCacheService } from 'src/common/cache/transfercontrol.cache.service';
import { BaseException } from 'src/common/exceptions/base.exception';
import { ResponseManager } from 'src/common/handler/response.manager';
import { WriterService } from 'src/common/writer/writer.service';

@ApiTags('transfercontrol')
@Controller('transfercontrol')
export class TransferControlController {
  constructor(
    private readonly transfercontrolService: TransferControlService,
    private readonly transferCache: TransferStateCacheService,
    private readonly responseManager: ResponseManager,
    private readonly writerService: WriterService,
  ) {}

  @Get()
  async findAll(@Req() req : any): Promise<TransferControl[]> {
    const user = req.session.user;
    return this.transfercontrolService.findAll(user.site_cd);
  }

  @Post()
  @ApiBody({
    description: 'Create a new transfer control',
    required: true,
    schema: {
      example: {
        transfer_id: '',
        transfer_status_tx: 'READY',
        transfer_type: 'TRANSFER',
        priority_no: 10,
        assigned_robot_id: '',
        source_port_id: 'P1-1',
        destination_port_id: 'P1-2',
        site_cd: 'HU',
      },
    },
  })
  async create(
    @Req() req: any,
    @Body() transferControl: TransferControl,
  ): Promise<string | TransferControl> {
    const user = req.session.user;
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

    transferControl.transfer_id = transferControl.transfer_id ?? transactionId;
    transferControl.transfer_status_tx =
      transferControl.transfer_status_tx ?? 'READY';
    transferControl.transfer_tp = transferControl.transfer_tp ?? 'TRANSFER';
    transferControl.priority_no = transferControl.priority_no ?? 10;
    transferControl.assigned_robot_id = transferControl.assigned_robot_id ?? '';
    transferControl.source_port_id = transferControl.source_port_id ?? null;
    transferControl.destination_port_id =
      transferControl.destination_port_id ?? ''; // 에러처리용 ( 빈 값 )
    transferControl.site_cd = user.site_cd;
    transferControl.creator_by = user.user_nm;
      

    const result = await this.transfercontrolService.create(transferControl);
    return result;
  }

  //추후에 계정정보기준으로 session 값 추가 예정 ( site , user )
  @Get('abort')
  async abortTransfer(@Req() req: any, @Query('transferId') transferId: string): Promise<any> {
    const user = req.session.user;
    const transactionId = getFormattedTimestampTID();
    const transferControls =
      await this.transfercontrolService.findByTransferid(transferId, user.site_cd);
    if (transferControls.length === 0) {
      throw new BaseException({
        message: `Transfer with ID ${transferId} not found.`,
        statusCode: 400,
        debugMessage: `No transfer control found for ID ${transferId}`,
      });
    }

    this.writerService.publishTransferControl(
      'abort_transfer_control',
      transactionId,
      user.site_cd,
      user.user_nm,
      {
        transferId: transferId,
      },
    );
    const result = await this.responseManager.waitFor(transactionId);
    return result;
  }

  @Get('cancel')
  async cancelTransfer(@Req() req: any, @Query('transferId') transferId: string): Promise<any> {
    const user = req.session.user;
    const transactionId = getFormattedTimestampTID();
    const transferControls =
      await this.transfercontrolService.findByTransferid(transferId, user.site_cd);
    if (transferControls.length === 0) {
      throw new BaseException({
        message: `Transfer with ID ${transferId} not found.`,
        statusCode: 400,
        debugMessage: `No transfer control found for ID ${transferId}`,
      });
    }

    this.writerService.publishTransferControl(
      'cancel_transfer_control',
      transactionId,
      user.site_cd,
      user.user_nm,
      {
        transferId: transferId,
      },
    );
    const result = await this.responseManager.waitFor(transactionId);
    return result;
  }

  @Post('priority_update')
  @ApiBody({
    description: 'Update the priority of a transfer control',
    required: true,
    schema: {
      example: {
        transfer_id: 'TID1234567890',
        priority_no: 5,
      },
    },
  })
  async updatePriority(
    @Req() req: any,
    @Body() updateData: { transfer_id: string; priority_no: number },
  ): Promise<TransferControl> {
    const user = req.session.user;
    const { transfer_id, priority_no } = updateData;

    if (!transfer_id || priority_no === undefined) {
      throw new BaseException({
        message: 'Transfer ID and priority number are required.',
        statusCode: 400,
        debugMessage: 'Invalid input data for priority update.',
      });
    }

    const transferControl = await this.transfercontrolService.selectOne({
      transfer_id : transfer_id,
      site_cd: user.site_cd
    });

    if (!transferControl) {
      throw new BaseException({
        message: `Transfer with ID ${transfer_id} not found.`,
        statusCode: 400,
      });
    }
    transferControl.priority_no = priority_no;

    await this.transfercontrolService.update({ transfer_id }, transferControl);

    return transferControl;
  }

  @Post('search')
  @ApiBody({
    description:
      'Search tasks based on transfer status and Login LocalStorage Keeping site code',
    required: true,
    schema: {
      example: {
        transfer_id: '',
        transfer_type: 'TRANSFER',
        transfer_source_port: 'P1-1',
        transfer_dest_port: 'P1-2',
        transfer_status_tx: 'READY',
        site_cd: 'HU',
      },
    },
  })
  async searchTasks(
    @Body()
    transferDto: {
      transfer_id: string;
      transfer_tp: string;
      transfer_source_port: string;
      transfer_dest_port: string;
      transfer_status_tx: string;
      site_cd: string;
    },
  ): Promise<any[]> {
    return this.transfercontrolService.searchTasks(
      transferDto.transfer_id,
      transferDto.transfer_tp,
      transferDto.transfer_source_port,
      transferDto.transfer_dest_port,
      transferDto.transfer_status_tx,
      transferDto.site_cd,
    );
  }
}
