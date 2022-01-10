const requestBaseUrl =
  'https://rancher.server/v3/project/c-nwkvn:p-7gqbl/workloads/deployment:';

// 项目配置
module.exports = {
  token: 'rancher上新建的token',
  projects: [
    {
      requestUrl: requestBaseUrl + 'namespace:deployment', // 项目部署的 命名空间+部署名
      repoFullName: 'repoNamespace/repoName', // 阿里云上的仓库名
    },
  ],
};
