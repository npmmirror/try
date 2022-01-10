'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');
const url = require('url');

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
      push_data: { tag: newImageTag },
    } = ctx.request.body;
    const { projects = [] } = this.config.rancher;
    const targetProjects = projects.filter((item) => {
      return item.repoFullName === repoFullName;
    });
    if (targetProjects && targetProjects.length > 0) {
      const result = await Promise.all(
        targetProjects.map(async (targetProject) => {
          const token = targetProject.token;
          const deploymentInfo = await ctx.curl(targetProject.requestUrl, {
            method: 'GET',
            dataType: 'json',
            headers: {
              Authorization: 'Bearer ' + token,
              'content-type': 'application/json',
            },
          });
          const currentImageUrl = _.get(
            deploymentInfo.data,
            'containers.0.image',
            ''
          );
          const currentImageTag = /.*:(.*)/.exec(currentImageUrl)[1];
          const matched = currentImageTag === newImageTag;
          if (matched) {
            await ctx.curl(targetProject.requestUrl, {
              method: 'POST',
              dataAsQueryString: true,
              data: {
                action: 'redeploy',
              },
              headers: {
                Authorization: 'Bearer ' + token,
                'content-type': 'application/json',
              },
            });
          }
          const u = new url.URL(targetProject.requestUrl);
          return {
            currentImageTag,
            matched,
            requestUrl: targetProject.requestUrl,
            pathname: u.pathname,
          };
        })
      );
      const keys = ['currentImageTag', 'requestUrl'];
      const resp = {
        matched: result
          .filter((item) => item.matched)
          .map((item) => _.pick(item, keys)),
        unmatched: result
          .filter((item) => !item.matched)
          .map((item) => _.pick(item, keys)),
      };
      ctx.body = JSON.stringify(resp, null, '  ');
      if (resp.matched.length === 0) {
        ctx.status = 500;
      }
    } else {
      ctx.status = 500;
      ctx.body = `${repoFullName}没有对应的配置项`;
    }
  }
}

module.exports = HomeController;
