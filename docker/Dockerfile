FROM node:10.12.0-alpine

MAINTAINER Grzegorz Szadkowski <5392918+gszadkow@users.noreply.github.com>

ENV BRAIN_VERSION v.0.1.47

ADD brain.tar /
RUN set -e \
    && apk update \
    && apk add --update \
        alpine-sdk \
        bash \
        python \
        make \
    && cd /brain \
    && pwd \
    && ls -ltr \
    && npm install \
    && echo "Done"

WORKDIR /brain
ENTRYPOINT ["npm", "start"]