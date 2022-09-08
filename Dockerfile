FROM node:14.20-alpine3.15
WORKDIR /LOGIN-WITH-GITHUB
ENV PATH="/node_modules/.bin:$PATH"
copy . .
RUN yarn build
CMD ["yarn","start"]