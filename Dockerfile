FROM node:12.13.1-alpine3.10
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . .
RUN npm run build
EXPOSE 3000
CMD npm start
