import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private redisClient;

  constructor() {
    this.redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    });
  }

  async onModuleInit() {
    this.redisClient.on('error', (err) =>
      console.log('Redis client error', err),
    );
    this.redisClient.on('connect', () => {
      console.log('Redis client connect success');
    });
    await this.redisClient.connect();
  }

  async get(key) {
    return this.redisClient.get(key);
  }

  async set(key, value) {
    return this.redisClient.set(key, value);
  }
}
