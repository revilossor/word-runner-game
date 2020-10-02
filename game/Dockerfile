FROM node:12

WORKDIR /opt/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY src ./src
COPY server.js ./

EXPOSE 8080

CMD [ "npm", "start" ]
