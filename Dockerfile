FROM nginx:stable-alpine3.17-slim
COPY dist/spring-boot-snipset /usr/share/nginx/html
