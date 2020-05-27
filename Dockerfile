FROM ubuntu:18.04

RUN apt-get update && apt-get install -y nginx

ARG settings=

COPY www /MorphicLiteWeb/www
COPY settings/${settings:-production}.js /MorphicLiteWeb/www/settings.js
COPY config /MorphicLiteWeb/config

# forward request and error logs to docker log collector
RUN mkdir -p /MorphicLiteWeb/logs && ln -sf /dev/stdout /MorphicLiteWeb/logs/access.log && ln -sf /dev/stderr /MorphicLiteWeb/logs/error.log

EXPOSE 80

CMD ["nginx", "-p", "/MorphicLiteWeb", "-c", "config/nginx.conf", "-g", "daemon off;"]