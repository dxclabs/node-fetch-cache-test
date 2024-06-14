import { expect } from 'chai';
import proxyquire from 'proxyquire';
import RedisMock from 'ioredis-mock';

describe('RedisClient', () => {
  let RedisClient: any;
  let redisClient: any;

  before(() => {
    // Use proxyquire to mock 'ioredis' with 'ioredis-mock'
    const stubs = {
      'ioredis': RedisMock
    };

    // Import the module with mocked dependencies
    const module = proxyquire('ioredisModule', stubs);

    // Extract the RedisClient class
    RedisClient = module.default;

    // Instantiate the mocked RedisClient
    redisClient = new RedisClient();
  });

  it('should set and get a value', async () => {
    const key = 'test_key';
    const value = 'test_value';

    await redisClient.setValue(key, value);
    const result = await redisClient.getValue(key);

    expect(result).to.equal(value);
  });
});
