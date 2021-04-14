const Queue = require("bull");

const helloQueue = new Queue("hello", {
  redis: "redis://:@127.0.0.1:36379/1",
});

const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

helloQueue.process("default", async (job) => {
  console.log("start job", job.data);
  for (let i = 0; i < 2; i++) {
    await delay(700);
    console.log("delay job", job.data);
    // job.progress(i * 10);
  }
  console.log("finish job", job.data);
  const ram = Math.random();
  if (ram > 0.2) {
    return {
      data: job.data,
      time: new Date().toLocaleString(),
    };
  } else {
    throw new Error("random error" + ram);
  }
});

setInterval(() => {
  const t = "name" + Date.now().toFixed(0);
  console.log(t);
  helloQueue
    .add(
      "default",
      { t },
      {
        removeOnComplete: true, // 完成后从队列移除
        removeOnFail: true,
      }
    )
    .then((res) => {
      res;
    })
    .catch((err) => {
      console.error(err);
    });
}, 1000);

setTimeout(() => {}, 9999999);
