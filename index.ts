// import fetch from 'node-fetch-cache';
import NodeFetchCache, { RedisCache } from 'node-fetch-cache';
// import RedisMock from 'ioredis-mock';
import RedisClient from './src/ioredisModule';

async function testRedis() {
  const redis = new RedisClient();
  await redis.setValue("test", "testdata")
  const result = await redis.getValue("test")
  console.log("result: " + result)
}

// async function fetchData() {
//   console.time('Fetch Time');  // Start timing
//   const fetch = NodeFetchCache.create({
//     cache: new RedisCache({host: "127.0.0.1", port: 6379, db: 0, ttl: 60000})
//     // cache: new RedisCache({path: "localhost:6379", ttl: 60000})
//     // cache: new RedisCache({ttl: 60000})
//   })

//   // const response = await fetch('https://www.google.com');
//   await fetch('https://www.google.com');

//   console.timeEnd('Fetch Time');  // End timing and print the duration
//   // console.log(await response.headers);
// }

// Try this file with tsx index.ts

// fetchData();
testRedis();
