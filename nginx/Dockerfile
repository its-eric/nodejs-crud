FROM alpine:latest

RUN apk --update add git nginx

RUN mkdir -p /run/nginx

RUN adduser -D -g 'www' www

ENV WWW_PATH=/www

RUN mkdir $WWW_PATH
RUN chown -R www:www /var/lib/nginx
RUN chown -R www:www $WWW_PATH

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT [ "nginx" ]
