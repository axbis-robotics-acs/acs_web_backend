// elastic-log.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class ElasticLogService implements OnModuleInit, OnModuleDestroy {
  private readonly host = process.env.LOGSTASH_HOST || 'localhost';
  private readonly port = Number(process.env.LOGSTASH_PORT || 5000);
  private readonly timeoutMs = 30000;
  private readonly reconnectDelay = 5000; // 5초 후 재시도

  private client: net.Socket | null = null;
  private isConnected = false;
  private reconnectTimer: NodeJS.Timeout | null = null;

  onModuleInit() {
    this.connect();
  }

  onModuleDestroy() {
    this.cleanup();
  }

  private connect() {
    this.client = new net.Socket();

    this.client.setTimeout(this.timeoutMs);

    this.client.connect(this.port, this.host, () => {
      this.isConnected = true;
      console.log('[Logstash TCP] ✅ Connected to Logstash');
    });

    this.client.on('timeout', () => {
      console.warn('[Logstash TCP] ⚠ Connection timeout');
      this.client?.destroy();
    });

    this.client.on('error', (err) => {
      console.error('[Logstash TCP] ❌ Connection error:', err.message);
      this.isConnected = false;
      this.scheduleReconnect();
    });

    this.client.on('close', (hadError) => {
      console.warn(
        `[Logstash TCP] 🔌 Connection closed${hadError ? ' with error' : ''}`,
      );
      this.isConnected = false;
      this.scheduleReconnect();
    });
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;

    this.reconnectTimer = setTimeout(() => {
      console.log('[Logstash TCP] 🔁 Attempting to reconnect...');
      this.reconnectTimer = null;
      this.connect();
    }, this.reconnectDelay);
  }

  private cleanup() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.client) {
      this.client.removeAllListeners();
      this.client.destroy();
      this.client = null;
    }
  }

  logMessage(data: Record<string, any>): void {
    if (!this.client || !this.isConnected) {
      console.warn('[Logstash TCP] ❌ Not connected. Dropping log.');
      return;
    }

    const logLine =
      JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }) + '\n';

    this.client.write(logLine, (err) => {
      if (err) {
        console.error('[Logstash TCP] ❌ Write error:', err.message);
      }
    });
  }
}
