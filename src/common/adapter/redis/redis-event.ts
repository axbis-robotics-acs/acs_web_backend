import { RedisClientType } from "redis";

// redis-events.ts
export function registerRedisEvents(client: RedisClientType) {
    client.on('connect', () => {
        console.log('[REDIS] ✅ Redis 연결 성공');
    });

    client.on('ready', () => {
        console.log('[REDIS] ✅ Redis 연결 준비 완료');
    });

    client.on('reconnecting', () => {
        console.log('[REDIS] 🔄 Redis 재연결 시도 중...');
    });

    client.on('error', (err) => {
        console.error('[REDIS] ❌ Redis 오류 발생:', err);
    });

    client.on('end', () => {
        console.warn('[REDIS] ⚠️ Redis 연결 종료됨');
    });
}
