FROM node:alpine
WORKDIR /LOGIN-WITH-GITHUB/server
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./ ./
EXPOSE 5000
CMD [ "node", "index.js" ]