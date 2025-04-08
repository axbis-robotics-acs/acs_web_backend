// src/common/filters/all-exceptions.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const type = host.getType();

    switch (type) {
      case 'http':
        return this.handleHttpException(exception, host);
      case 'rpc':
        return this.handleRpcException(exception, host);
      case 'ws':
        return this.handleWsException(exception, host);
      default:
        return this.handleUnknownException(exception, host);
    }
  }

  private handleHttpException(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const response = isHttp ? exception.getResponse() : { message: 'Internal server error' };

    res.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method,
      statusCode: status,
      ...this.normalizeResponse(response),
    });
  }

  private handleRpcException(exception: unknown, host: ArgumentsHost) {
    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : 500;
    const response = isHttp ? exception.getResponse() : { message: 'RPC error occurred' };

    return {
      success: false,
      timestamp: new Date().toISOString(),
      statusCode: status,
      ...this.normalizeResponse(response),
    };
  }

  private handleWsException(exception: unknown, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : 500;
    const response = isHttp ? exception.getResponse() : { message: 'WebSocket error occurred' };

    const payload = {
      success: false,
      timestamp: new Date().toISOString(),
      statusCode: status,
      ...this.normalizeResponse(response),
    };

    client.emit('error', payload);
  }

  private handleUnknownException(exception: unknown, host: ArgumentsHost) {
    console.error('Unknown transport exception:', exception);
    return {
      success: false,
      timestamp: new Date().toISOString(),
      statusCode: 500,
      message: 'Unknown error occurred',
    };
  }

  private normalizeResponse(response: any): Record<string, any> {
    if (typeof response === 'string') {
      return { message: response };
    }
    return response;
  }
}
