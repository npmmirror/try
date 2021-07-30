const Queue = require('bull');
const express = require('express');
const { router, BullAdapter, setQueues } = require('bull-board');

const helloQueue = new Queue('hello', 'redis://:@127.0.0.1:36379/1');

const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

helloQueue.process('default', async (job) => {
  console.log('start job', job.id, job.data);
  for (let i = 0; i < 1; i++) {
    await delay(1000);
    console.log('delay job', job.data);
    // job.progress(i * 10);
  }
  const ram = Math.random();
  if (ram > 0.2) {
    console.log('finished job', job.id, job.data);
    return {
      data: job.data,
      time: new Date().toLocaleString(),
    };
  } else {
    console.log('failed job', job.id, job.data);
    throw new Error('random error' + ram);
  }
});

setInterval(() => {
  const t = 'name' + new Date().toLocaleString();
  console.log('add task', t);
  helloQueue
    .add(
      'default',
      { t },
      {
        removeOnComplete: true, // 完成后从队列移除
        removeOnFail: true,
        attempts: 3, // 重试3次
        delay: 1000, // 延时
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

const app = express();

setQueues([new BullAdapter(helloQueue)]);
app.use('/', router);

app.listen(3000);
