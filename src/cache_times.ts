import fetch from "node-fetch-cache";
import NodeFetchCache, { MemoryCache, FileSystemCache } from "node-fetch-cache";
import { RedisCache } from "@node-fetch-cache/redis";

// const TEST_URL = 'https://www.google.com'
const TEST_URL = "https://dummyjson.com/products/1";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchDataRedis(headers: { [key: string]: string } = {}) {
  const fetch = NodeFetchCache.create({
    cache: new RedisCache({ host: "127.0.0.1", port: 6379, db: 0, ttl: 100 }),
    // cache: new RedisCache({path: "localhost:6379", ttl: 60000})
    // cache: new RedisCache({ttl: 60000})
  });

  return await testCache(fetch, headers);
}

async function fetchDataMemory(headers: { [key: string]: string } = {}) {
  const fetch = NodeFetchCache.create({
    cache: new MemoryCache({ ttl: 100 }),
  });

  return await testCache(fetch, headers);
}

async function fetchDataMemoryDefault(headers: { [key: string]: string } = {}) {
  return await testCache(fetch, headers);
}

async function fetchDataFileCache(headers: { [key: string]: string } = {}) {
  const fetch = NodeFetchCache.create({
    cache: new FileSystemCache({ ttl: 100 }),
  });

  return await testCache(fetch, headers);
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

// Try this file with tsx cache_times.ts

async function main() {
  const headers = { "Cache-Control": "only-if-cached" };

  console.log("Cache with Redis, Custom Cache with TTL");
  console.log("Fetch 1");
  await fetchDataRedis();
  console.log("Fetch 2");
  await fetchDataRedis();

  console.log("\nCache with Redis, Custom Cache with TTL, Cache Control");
  console.log("Fetch 1");
  await fetchDataRedis(headers);
  await delay(200);
  console.log("\nA Few Moments Later");
  console.log("Fetch 2");
  await fetchDataRedis(headers);

  console.log("\nCache in Memory, Custom Cache with TTL");
  console.log("Fetch 1");
  await fetchDataMemory();
  console.log("Fetch 2");
  await fetchDataMemory();

  console.log("\nCache in Memory, Custom Cache with TTL, Cache Control");
  console.log("Fetch 1");
  await fetchDataMemory(headers);
  await delay(100);
  console.log("\nA Few Moments Later");
  console.log("Fetch 2");
  await fetchDataMemory(headers);

  console.log("\nCache in Memory, Default Cache");
  await fetchDataMemoryDefault();
  await fetchDataMemoryDefault();

  console.log("\nCache in Memory, Default Cache, Cache Control");
  await fetchDataMemoryDefault(headers);
  await delay(100);
  console.log("\nA Few Moments Later");
  await fetchDataMemoryDefault(headers);

  console.log("\nCache to Disk, Custom Cache with TTL");
  await fetchDataFileCache();
  await fetchDataFileCache();

  console.log("\nCache to Disk, Custom Cache with TTL, Cache Control");
  await fetchDataFileCache(headers);
  await delay(200);
  console.log("\nA Few Moments Later");
  await fetchDataFileCache(headers);
}

main();
