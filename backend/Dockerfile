FROM node:8

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]