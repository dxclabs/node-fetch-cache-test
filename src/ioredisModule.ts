import Redis from 'ioredis';

class RedisClient {
  private client: Redis.Redis;

  constructor() {
    this.client = new Redis();
  }

  async setValue(key: string, value: string) {
    await this.client.set(key, value);
  }

  async getValue(key: string) {
    return await this.client.get(key);
  }
}

export default RedisClient;
