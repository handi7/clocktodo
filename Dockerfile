FROM node:20.9.0

WORKDIR /app

COPY package*.json ./
COPY next.config.js ./next.config.js

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]
