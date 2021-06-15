import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    this.doLog('sayHi');
    await this.app.queue.task.add('ddd', {
      id: 'sayHi' + new Date().toLocaleString(),
    });
    return `hi, ${name}, dddqqqaaa` + this.ctx.path;
  }

  public doLog(name?: string) {
    this.ctx.logger.info('Test.doLog:' + (name ? name : 'default'));
  }
}
