const Queue = require('bull');

const log4js = require('log4js');

log4js.configure({
  appenders: { console: { type: 'console' } },
  categories: { default: { appenders: ['console'], level: 'debug' } },
});
const logger = log4js.getLogger('bull-repeat');
logger.level = 'debug';

const myQueue = new Queue('myQueue', {
  redis: 'redis://:@127.0.0.1:36379/1',
});

const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

function startProcessor() {
  logger.debug('add processor');
  myQueue.process('repeatJob', async (job) => {
    logger.info('RUN JOB', 'repeatJob', { 'job.id': job.id, 'job.data': job.data, 'job.opts.jobId': job.opts.jobId });
  });
}

async function addJob(jobId) {
  logger.debug('add JOB', jobId);

  const job = await myQueue.add(
    'repeatJob',
    { jbId: jobId },
    {
      jobId: String(jobId),
      repeat: {
        cron: '*/5 * * * * *',
      },
      removeOnComplete: true,
      removeOnFail: true,
    }
  );
  logger.info('ADD JOB', 'jobId', job.id);
}

async function removeJob(jobId) {
  await myQueue.removeRepeatable('repeatJob', {
    jobId: String(jobId),
    cron: '*/5 * * * * *',
  });

  logger.debug('REMOVE JOB', 'jobId', jobId);
}

async function removeJobById(jobId) {
  const job = await myQueue.getJob(jobId);
  if (!job) {
    logger.error('cannot find job for jobId:', jobId);
    return;
  }
  await job.remove();

  logger.debug('REMOVE JOB BY ID', 'jobId', jobId);
}

const argv = process.argv.slice(2);
switch (argv[0]) {
  case 'start':
    startProcessor();
    break;
  case 'add':
    addJob(argv[1]).then(() => process.exit(0));
    break;
  case 'rm':
    removeJob(argv[1]).then(() => process.exit(0));
    break;
  case 'rmid':
    removeJobById(argv[1]).then(() => process.exit(0));
    break;
  default:
    logger.error('invalid input');
    process.exit(1);
}
