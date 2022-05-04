FROM node:16-alpine

RUN addgroup -S nupp && adduser -S -g nupp nupp

ENV HOME=/home/nupp

COPY package.json package-lock.json $HOME/app/

COPY src/ $HOME/app/src

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init

WORKDIR $HOME/app

RUN chmod +x /usr/local/bin/dumb-init && \
    npm install --silent --progress=false --production

USER nupp

EXPOSE 8080

CMD ["dumb-init", "npm", "start"]
