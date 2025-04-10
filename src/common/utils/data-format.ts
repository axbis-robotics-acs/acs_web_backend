export function getFormattedTimestampTID(): string {
  const now = new Date();
  const pad = (n: number, width = 2) => n.toString().padStart(width, '0');

  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds()) +
    pad(now.getMilliseconds(), 3)
  );
}

export function parseTimestamp(tid: string): Date {
  const [year, month, day, hour, minute, second, millis] = [
    tid.slice(0, 4),
    tid.slice(4, 6),
    tid.slice(6, 8),
    tid.slice(8, 10),
    tid.slice(10, 12),
    tid.slice(12, 14),
    tid.slice(14, 17),
  ];

  // UTC 기준 (Z는 UTC를 의미)
  return new Date(
    `${year}-${month}-${day}T${hour}:${minute}:${second}.${millis}Z`,
  );
}

export function formatDuration(ms: number): string {
  if (ms < 1000 && ms >= 0) return `${ms}ms`;

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${remainingMinutes}분 ${remainingSeconds}초 (${ms})ms `;
  } else if (minutes > 0) {
    return `${minutes}분 ${remainingSeconds}초 (${ms})ms`;
  } else {
    return `${(ms / 1000).toFixed(3)}s`;
  }
}
