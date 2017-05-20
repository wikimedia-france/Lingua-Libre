FROM php:5.6-fpm

RUN apt-get update \
  && docker-php-ext-install -j$(nproc) pdo pdo_mysql
