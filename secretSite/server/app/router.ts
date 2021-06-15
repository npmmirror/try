import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  app.resources('users', '/users', app.controller.user);
  app.resources('posts', '/posts', app.controller.post);
};
