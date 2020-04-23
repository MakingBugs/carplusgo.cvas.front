FROM 192.168.21.41/lib/node:alpine as BUILD

WORKDIR /usr/src/app

ARG BUILD_ARGS=build
ENV BUILD_ARGS $BUILD_ARGS
RUN env
RUN env |grep BUILD_ARGS

RUN mkdir -p /usr/src/app

ADD . /usr/src/app

RUN npm install -g yarn && \
    yarn config set registry http://192.168.21.41:8081/repository/npm-group/  && \
    yarn install && \
    yarn $BUILD_ARGS

FROM 192.168.21.41/lib/nginx:1.16.1-alpine

COPY --from=BUILD /usr/src/app/dist /usr/share/nginx/html

ADD nginx.conf /etc/nginx/conf.d/default.conf