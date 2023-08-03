# Build stage
FROM node:16-alpine as build

# Set the working directory inside the container
WORKDIR /usr/src/reactapp

RUN chown -R node:node /usr/src/reactapp

USER node

COPY *.json ./

COPY  yarn.lock ./

RUN yarn install --frozen-lockfile

COPY src src

COPY public public

RUN yarn run build

# List the contents of the build directory for verification
# RUN ls -l /usr/src/reactapp/build

# Production stage
FROM nginx:alpine

# Remove the default nginx configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the build stage
COPY --from=build /usr/src/reactapp/build /usr/share/nginx/html

EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]