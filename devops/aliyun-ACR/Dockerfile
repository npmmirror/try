FROM node:alpine as build-deps

WORKDIR /usr/src/app/
USER root
COPY package.json ./
RUN npm install --production --registry=https://registry.npm.taobao.org

COPY ./ ./

EXPOSE 7001

ENTRYPOINT ["npm", "run", "docker-start"]
