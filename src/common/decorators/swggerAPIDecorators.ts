// swagger/api-default.decorator.ts
// summary, params, response

import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';

interface ParamMeta {
  name: string;             // 파라미터 이름
  description: string;      // 설명
  type?: any;               // 타입 (기본: string)
  required?: boolean;       // 필수 여부 (기본: true)
}


interface ApiDefaultOptions {
  summary: string;                          // API 설명

  params?: ParamMeta[];                     // Path Param 목록 (:id 등)
  query?: ParamMeta[];                      // Query Param 목록 (?q=abc 등)
  bodyDto?: Type<any>;                      // Request Body DTO 클래스
  fileField?: string;                       // multipart file 필드명 ('file' 등)

  successResponseDto?: Type<any>;           // 응답 DTO 클래스
  auth?: boolean;                           // Bearer 인증 포함 여부 (기본: false)
}

export function ApiDefault(options: ApiDefaultOptions) {
  const decorators = [
    ApiOperation({ summary: options.summary }),
    ApiResponse({
      status: 200,
      description: '성공',
      type: options.successResponseDto,
    }),
    ApiResponse({ status: 400, description: '잘못된 요청' }),
  ];

  // BearerAuth 옵션
  if (options.auth) {
    decorators.push(ApiBearerAuth());
  }

  // Path Params
  if (options.params) {
    options.params.forEach((param) =>
      decorators.push(
        ApiParam({
          name: param.name,
          description: param.description,
          required: param.required ?? true,
          type: param.type || String,
        }),
      ),
    );
  }

  // Query Params
  if (options.query) {
    options.query.forEach((q) =>
      decorators.push(
        ApiQuery({
          name: q.name,
          description: q.description,
          required: q.required ?? true,
          type: q.type || String,
        }),
      ),
    );
  }

  // Request Body DTO
  if (options.bodyDto) {
    decorators.push(
      ApiBody({
        type: options.bodyDto,
      }),
    );
  }

  // File Upload (multipart/form-data)
  if (options.fileField) {
    decorators.push(ApiConsumes('multipart/form-data'));
    decorators.push(
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            [options.fileField]: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
}
