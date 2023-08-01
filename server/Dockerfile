# Build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/nodeapp

RUN chown -R node:node /usr/src/nodeapp

USER node

COPY *.json ./

RUN yarn install --frozen-lockfile

COPY src src

# Install TypeScript here (tsc)
RUN yarn global add typescript

RUN yarn run build

# Production stage
FROM node:18-alpine

WORKDIR /usr/src/nodeapp

RUN chown -R node:node /usr/src/nodeapp

COPY package*.json ./

RUN yarn install --frozen-lockfile --production=true

USER node

COPY --chown=node:node --from=build /usr/src/nodeapp/build ./build

EXPOSE 4000

CMD [ "node", "build/app.js" ]
