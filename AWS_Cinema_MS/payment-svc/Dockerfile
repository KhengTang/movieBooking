FROM node:16-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python git openssh

RUN addgroup -S nupp && adduser -S -g nupp nupp

#ENV HOME=/home/
ENV HOME=/home

COPY package.json npm-shrinkwrap.json $HOME/app/

COPY src/ $HOME/app/src

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init

WORKDIR $HOME/app

RUN chown -R nupp:nupp $HOME/* /usr/local/ && \
  chmod +x /usr/local/bin/dumb-init && \
  #    npm cache clean && \
  chown -R nupp:nupp ./bluefyre-agent-node-1.2.8.tgz && \
  npm install --silent --progress=false --production 


USER nupp

EXPOSE 3004

CMD ["dumb-init", "npm", "start"]
