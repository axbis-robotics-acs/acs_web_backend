import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { registerRedisEvents } from './redis-event';

@Injectable()
export class RedisService implements OnModuleInit {
    private client: RedisClientType;

    async onModuleInit() {
        this.client = createClient({
            url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        });

        registerRedisEvents(this.client);
        await this.client.connect();

        console.log('✅ RedisService 연결 완료');
    }

    getClient() {
        return this.client;
    }

    async setSessionUser(sessionId: string, user: any, ttlSec = 3600) {
        await this.client.set(`session:${sessionId}`, JSON.stringify(user), {
            EX: ttlSec,
        });
    }

    async getSessionUser(sessionId: string): Promise<any | null> {
        const key = `session:${sessionId}`;
        const data = await this.client.get(key);
        if (data) {
            await this.client.expire(key, 3600); // TTL 연장
            return JSON.parse(data);
        }
        return null;
    }

    async deleteSessionUser(sessionId: string) {
        await this.client.del(`session:${sessionId}`);
    }
}
