FROM openresty/openresty:alpine

# need gettext for envsubst in the entrypoint.sh
RUN apk update 
RUN apk add gettext

RUN  mkdir -p /run/nginx

# copy website
ENV WWWDIR=/MorphicLiteWeb/www
COPY www ${WWWDIR}

RUN mkdir /MorphicLiteWeb/lua
COPY nginx-lua-prometheus/*.lua /MorphicLiteWeb/lua/

# copy nginx config
COPY config /MorphicLiteWeb/config

COPY entrypoint.sh /
RUN chmod a+rx entrypoint.sh

# forward request and error logs to docker log collector
RUN mkdir -p /MorphicLiteWeb/logs && ln -sf /dev/stdout /MorphicLiteWeb/logs/access.log && ln -sf /dev/stderr /MorphicLiteWeb/logs/error.log

EXPOSE 80
EXPOSE 9145

CMD ["/entrypoint.sh"]
