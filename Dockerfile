FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD [ "node", "index.js" ]
