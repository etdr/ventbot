FROM node:alpine

ENV NODE_ENV=production


WORKDIR /ventbot

COPY ["package.json", "package-lock.json", "./"]

RUN npm i --production

COPY . .

CMD ["node", "index.js"]