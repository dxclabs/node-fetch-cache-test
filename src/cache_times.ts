import fetch from "node-fetch-cache";
import NodeFetchCache, { MemoryCache, FileSystemCache } from "node-fetch-cache";
import { RedisCache } from "@node-fetch-cache/redis";

// const TEST_URL = 'https://www.google.com'
const TEST_URL = "https://dummyjson.com/products/1";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


async function testCache(
  fetch: typeof NodeFetchCache,
  headers: { [key: string]: string } = {},
): Promise<void> {
  console.time("Fetch Time"); // Start timing

  const response = await fetch(TEST_URL, { headers: headers });

  console.log("Status: " + response.status + " (" + response.statusText + ")");
  // console.log(response.headers);
  console.log("isCacheMiss: " + response.isCacheMiss);
  console.log("returnedFromCache: " + response.returnedFromCache);

  console.timeEnd("Fetch Time"); // End timing and print the duration
}

// Try this file with tsx ./src/cache_times.ts

async function main() {
  const headers = { "Cache-Control": "only-if-cached" };

  const redisCacheFetch = NodeFetchCache.create({
    cache: new RedisCache({ host: "127.0.0.1", port: 6379, db: 0, ttl: 100 }),
    // cache: new RedisCache({path: "localhost:6379", ttl: 60000})
    // cache: new RedisCache({ttl: 60000})
  });

  console.log("Cache with Redis, Custom Cache with TTL");
  console.log("Fetch 1");
  await testCache(redisCacheFetch);
  console.log("\nFetch 2");
  await testCache(redisCacheFetch);

  console.log("\nCache with Redis, Custom Cache with TTL, Cache Control");
  console.log("Fetch 1");
  await testCache(redisCacheFetch, headers);
  await delay(200);
  console.log("\nA Few Moments Later");
  console.log("Fetch 2");
  await testCache(redisCacheFetch, headers);

  const memoryCacheFetch = NodeFetchCache.create({
    cache: new MemoryCache({ ttl: 100 }),
  });

  console.log("\nCache in Memory, Custom Cache with TTL");
  console.log("Fetch 1");
  await testCache(memoryCacheFetch);
  console.log("\nFetch 2");
  await testCache(memoryCacheFetch);

  console.log("\nCache in Memory, Custom Cache with TTL, Cache Control");
  console.log("Fetch 1");
  await testCache(memoryCacheFetch, headers);
  await delay(100);
  console.log("\nA Few Moments Later");
  console.log("Fetch 2");
  await testCache(memoryCacheFetch, headers);

  console.log("\nCache in Memory, Default Cache");
  console.log("Fetch 1");
  await testCache(fetch);
  console.log("\nFetch 2");
  await testCache(fetch);

  console.log("\nCache in Memory, Default Cache, Cache Control");
  console.log("Fetch 1");
  await testCache(fetch, headers);
  await delay(100);
  console.log("\nA Few Moments Later");
  console.log("Fetch 2");
  await testCache(fetch, headers);

  const diskCacheFetch = NodeFetchCache.create({
    cache: new FileSystemCache({ ttl: 100 }),
  });

  console.log("\nCache to Disk, Custom Cache with TTL");
  console.log("Fetch 1");
  await testCache(diskCacheFetch);
  console.log("\nFetch 2");
  await testCache(diskCacheFetch);

  console.log("\nCache to Disk, Custom Cache with TTL, Cache Control");
  console.log("Fetch 1");
  await testCache(diskCacheFetch, headers);
  await delay(200);
  console.log("\nA Few Moments Later");
  console.log("Fetch 2");
  await testCache(diskCacheFetch, headers);
}

main();
