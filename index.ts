// import fetch from 'node-fetch-cache';
// import NodeFetchCache, { RedisCache } from 'node-fetch-cache';
// import RedisMock from 'ioredis-mock';

import RedisClient from './src/ioredisModule';

async function testRedis() {
  const redis = new RedisClient()
  redis.setValue("test", "testdata")
  const result = await redis.getValue("test")
  console.log("result: " + result)
}

// async function fetchData() {
//   console.time('Fetch Time');  // Start timing
//   const fetch = NodeFetchCache.create({
//     cache: new RedisCache("localhost:6379", {ttl: 1000})
//   })

//   const response = await fetch('https://www.google.com');

//   console.timeEnd('Fetch Time');  // End timing and print the duration
// //   console.log(await response.headers);
// }

// fetchData();
testRedis();
