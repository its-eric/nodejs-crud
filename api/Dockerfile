FROM centos:7

RUN curl -sL https://rpm.nodesource.com/setup_10.x | bash -

RUN yum install -y nodejs

WORKDIR /usr/src/app

COPY ./package*.json /usr/src/app/

ARG name=defaultValue

CMD npm install && npm start
