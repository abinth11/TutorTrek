# server/Dockerfile

# Build stage
FROM node:20-alpine AS build

WORKDIR /usr/src/nodeapp

RUN chown -R node:node /usr/src/nodeapp

USER node

COPY *.json ./

RUN npm ci

COPY src src

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /usr/src/nodeapp

RUN chown -R node:node /usr/src/nodeapp

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

USER node

COPY --chown=node:node --from=build /usr/src/nodeapp/build ./build

EXPOSE 5000

CMD [ "node", "build/app.js" ]