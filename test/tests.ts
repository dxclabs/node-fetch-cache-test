// test/tests.ts
import { expect } from "chai";
import sinon from "sinon";
import Redis from "ioredis";
import RedisClient from "../src/ioredisModule";

describe("RedisClient", () => {
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
    setStub = mockRedisInstance.set.resolves("OK");
    getStub = mockRedisInstance.get.resolves("value");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should set value in Redis", async () => {
    const key = "test-key";
    const value = "test-value";

    await redisClient.setValue(key, value);

    expect(setStub.calledOnceWithExactly(key, value)).to.be.true;
  });

  it("should get value from Redis", async () => {
    const key = "test-key";

    // Stub the get method to resolve 'value'
    mockRedisInstance.get.resolves("value");

    const value = await redisClient.getValue(key);

    // Verify that the get method was called with the correct arguments
    expect(mockRedisInstance.get.calledOnceWithExactly(key)).to.be.true;
    expect(value).to.equal("value");
  });
});
