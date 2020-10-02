FROM node:12

WORKDIR /opt/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY index.js ./

EXPOSE 8000

CMD [ "npm", "start" ]
