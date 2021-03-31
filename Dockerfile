FROM node:14
WORKDIR /opt/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm i
COPY . .
RUN npm run build

WORKDIR ./dist
EXPOSE 8080
CMD npm run start
