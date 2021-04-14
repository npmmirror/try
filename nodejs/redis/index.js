console.log("hello");
const Redis = require("ioredis");

const redisClient = new Redis("redis://:@127.0.0.1:36379/0", {
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

async function main() {
  await redisClient.set("001", JSON.stringify({ a: 1 }));
  const res = await redisClient.get("001");
  console.log(JSON.parse(res));
  redisClient.set("exp", "333", "EX", 20);
}

main();
