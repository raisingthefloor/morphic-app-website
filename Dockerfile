FROM ubuntu:18.04

RUN apt-get update && apt-get install -y nginx

ENV WWWDIR=/MorphicLiteWeb/www
COPY www ${WWWDIR}
COPY config /MorphicLiteWeb/config
COPY entrypoint.sh /
RUN chmod a+rx entrypoint.sh

# forward request and error logs to docker log collector
RUN mkdir -p /MorphicLiteWeb/logs && ln -sf /dev/stdout /MorphicLiteWeb/logs/access.log && ln -sf /dev/stderr /MorphicLiteWeb/logs/error.log

EXPOSE 80

CMD ["/entrypoint.sh"]
