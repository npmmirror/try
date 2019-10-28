# 基于 nodejs 官网的 docker 教程

[https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/](https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/)

1. 构建镜像
```shell script
docker build . -t my-express-image
```

2. 运行容器

```shell script
docker run --rm -d -p 3000:3000 --name my-express-container my-express-image
```

3. 测试

```shell script
curl localhost:3000
```

4. 停止容器
（前面使用了 `--rm` 因此镜像会自动删除，不需要手动 `docker rm` ）

```shell script
docker stop my-express-container
```

5. 删除镜像

```shell script
docker rmi my-express-image
```