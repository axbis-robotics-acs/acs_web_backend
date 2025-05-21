// utils/common/format/message.format.ts

import { getFormattedTimestampTID } from './date.format';

export interface DataPayload {
  [key: string]: any;
}

export interface MessageHeader {
  requestId: string;
  workId: string;
  transactionId: string;
}

export interface MessageFormat {
  header: MessageHeader;
  dataSet: DataPayload;
}

// ✅ Raw 데이터를 표준 데이터 페이로드로 구성
export const buildDataPayload = (raw: any): DataPayload => {
  return {
    ...raw,
  };
};

// ✅ 정식 성공 메시지 생성
export const buildSuccessMessage = (
  requestId: string,
  workId: string,
  transactionId: string,
  data: DataPayload,
): MessageFormat => ({
  header: { requestId, workId, transactionId },
  dataSet: data.dataSet ?? {},
});

// ✅ Partial MessageFormat으로부터 기본값 포함 메시지 생성
export const buildSuccessMessageFromJson = (
  data: Partial<MessageFormat>,
): MessageFormat => ({
  header: {
    requestId: data.header?.requestId ?? 'UI',
    workId: data.header?.workId ?? '',
    transactionId: data.header?.transactionId ?? getFormattedTimestampTID(),
  },
  dataSet: data.dataSet ?? {},
});

// ✅ 오류 메시지 전용 메시지 생성
export const buildErrorMessage = (
  requestId: string,
  workId: string,
  transactionId: string,
): MessageFormat => ({
  header: { requestId, workId, transactionId },
  dataSet: { result: null, info: {}, timestamp: Date.now() },
});
