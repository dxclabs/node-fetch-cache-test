// test/tests.ts
import { expect } from 'chai';
import sinon from 'sinon';
import Redis from 'ioredis';
import RedisClient from '../src/ioredisModule';

describe('RedisClient', () => {
  let redisClient;
  let sandbox;
  let setStub;
  let getStub;
  let mockRedisInstance;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Create a mock Redis instance
    mockRedisInstance = sinon.createStubInstance(Redis);

    // Inject the mock Redis instance into RedisClient
    redisClient = new RedisClient(mockRedisInstance);

    // Stub the set and get methods on the mock instance
    setStub = mockRedisInstance.set.resolves('OK');
    getStub = mockRedisInstance.get.resolves('value');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should set value in Redis', async () => {
    const key = 'test-key';
    const value = 'test-value';

    await redisClient.setValue(key, value);

    expect(setStub.calledOnceWithExactly(key, value)).to.be.true;
  });
});

// Enable rewiremock and replace 'ioredis' with 'mock-ioredis'
// rewiremock(() => require('ioredis')).with(ioRedisMock);
// const mock = await rewiremock.module(() => import('../src/ioredisModule'), {...});

// rewiremock('ioredis').with('ioredis-mock')

// rewiremock.enable();

// Import the module that uses ioredis
// import {getValue, setValue} from '../src/ioredisModule';

// rewiremock.disable();

// describe('redisClient', () => {
//   beforeEach(async () => {
//     // Clear mock redis data before each test
//     const redis = new ioRedisMock();
//     await redis.flushall();
//   });

//   it('should set and get a value from Redis', async () => {
//     await setValue('foo', 'bar');
//     const value = await getValue('foo');

//     expect(value).to.equal('bar');
//   });

//   it('should return null for a non-existent key', async () => {
//     const value = await getValue('non-existent-key');

//     expect(value).to.be.null;
//   });
// });
