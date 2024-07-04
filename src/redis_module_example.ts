import RedisClient from "./ioredisModule";

async function testRedis() {
  const redis = new RedisClient();
  const setResult = await redis.setValue("test", "testdata");
  console.log("set result: " + setResult);
  const getResult = await redis.getValue("test");
  console.log("get result: " + getResult);
}

// Try this file with tsx ./src/redis_module_example.ts

async function main() {
  await testRedis();
}

main();
