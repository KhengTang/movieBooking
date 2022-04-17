FROM node:latest

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .

RUN npm install
RUN npm install -g nodemon
RUN npm install -g concurrently

COPY . .

EXPOSE 3000 5000

CMD ["npm", "run", "dev"]