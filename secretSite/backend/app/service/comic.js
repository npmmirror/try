'use strict';

const Service = require('egg').Service;

class ComicService extends Service {
  async getList({ limit }) {
    const sql = 'select * from `comics_list` where ((`comics_list`.`img_url_type` = 1) and (`comics_list`.`page_number` > 0) and (`comics_list`.`state` = 1) and (`comics_list`.`valid` = 1)) order by rand() limit ' + limit;
    return this.ctx.app.mysql.query(sql);
  }
}

module.exports = ComicService;
