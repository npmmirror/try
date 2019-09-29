'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/szyr/getAll', controller.szyr.getAllRoom);
  router.get('/video/getList', controller.video.getList);
  router.get('/comic/getList', controller.comic.getList);
};
