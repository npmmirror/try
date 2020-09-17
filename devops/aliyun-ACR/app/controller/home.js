'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');

/*
{
    "push_data": {
        "digest": "sha256:427066c7811e54f2067b444face58f947723250017f2ff408d1851b77679c6f8",
        "pushed_at": "2020-09-18 02:24:10",
        "tag": "dev1.0"
    },
    "repository": {
        "date_created": "2020-04-20 23:25:37",
        "name": "web-admin",
        "namespace": "yili-gun",
        "region": "cn-shenzhen",
        "repo_authentication_type": "NO_CERTIFIED",
        "repo_full_name": "yili-gun/web-admin",
        "repo_origin_type": "NO_CERTIFIED",
        "repo_type": "PRIVATE"
    }
}
*/

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const {
      repository: { repo_full_name: repoFullName },
    } = ctx.request.body;
    const { token, projects = [] } = this.config.rancher;
    const targetProject = projects.find((item) => {
      return item.repoFullName === repoFullName;
    });
    if (targetProject) {
      const result = await ctx.curl(targetProject.requestUrl, {
        method: 'POST',
        data: {},
        headers: {
          Authorization: 'Bearer ' + token,
          'content-type': 'application/json',
        },
      });
      ctx.body = { targetProject, result };
    }
  }
}

module.exports = HomeController;
