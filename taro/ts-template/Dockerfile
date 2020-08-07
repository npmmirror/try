FROM node:alpine as build-deps

WORKDIR /usr/src/app/
USER root
COPY package.json ./
COPY .npmrc ./
#RUN npm i -g mirror-config-china --registry=https://registry.npm.taobao.org
RUN npm install --registry=https://registry.npm.taobao.org

COPY ./ ./

RUN npm --version && npm run build:h5

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html

#COPY run.sh ./
#RUN chmod +x run.sh

#ENTRYPOINT ["./run.sh"]
#CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
