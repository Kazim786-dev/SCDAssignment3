FROM node:19.1.0

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]