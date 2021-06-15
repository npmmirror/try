import * as Queue from 'bull';
import { Application } from 'egg';

export default (app: Application) => {
  app.logger.info('queue');
  const q = new Queue('testqueue', {
    // createClient: () => app.redis,
    redis: {
      port: 36379,
      host: '127.0.0.1',
      // password: '123456',
      db: 0,
    },
    defaultJobOptions: {
      removeOnComplete: 5,
      removeOnFail: 10,
    },
  });
  q.process('ddd', function(job, done) {
    app.logger.info('[queue]', job.data);
    const ctx = app.createAnonymousContext();
    ctx.service.test.doLog('process');
    done();
  });
  return q;
};
