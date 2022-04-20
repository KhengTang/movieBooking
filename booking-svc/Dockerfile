FROM node:16-alpine


RUN addgroup -S appuser && adduser -S -g appuser appuser

RUN mkdir -p /home/app/src/node_modules && \
    chown -R appuser:appuser /home/app/src/node_modules /home/app/src/* /usr/local/ 

ENV HOME = /home/app/src

WORKDIR /home/app/src

COPY package*.json .

COPY . .

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init

#RUN npm cache clean
RUN chmod +x /usr/local/bin/dumb-init && \
    chown -R appuser:appuser /home/app/src/* && \
    npm install --silent --progress=false --production && \
    npm install -g nodemon concurrently 

USER appuser

EXPOSE 3000 5000

CMD ["dumb-init", "npm", "run", "dev"]