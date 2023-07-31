# Build stage
FROM node:16-alpine as build

# # Set the working directory inside the container
WORKDIR /usr/src/reactapp

RUN chown -R node:node /usr/src/reactapp

USER node

COPY *.json ./

COPY  yarn.lock ./

RUN yarn install --frozen-lockfile

COPY src src

COPY public public

RUN yarn run build

# Production stage
FROM node:16-alpine

# WORKDIR /reactapp
WORKDIR /usr/src/reactapp

RUN chown -R node:node /usr/src/reactapp

COPY package*.json ./

RUN yarn install --frozen-lockfile --production=true

USER node

COPY --chown=node:node --from=build /usr/src/reactapp/build ./build

EXPOSE 3000

RUN yarn global add serve

CMD ["serve", "build", "-s"]
