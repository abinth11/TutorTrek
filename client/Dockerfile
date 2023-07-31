# Use the official Node.js LTS image as the base image
FROM node:20-alpine as build

# Set the working directory inside the container
WORKDIR /usr/src/reactapp

# Copy package.json, yarn.lock, and other files to the container
COPY package.json yarn.lock ./
COPY . .

# Clear any existing proxy configurations
RUN yarn config delete proxy
RUN yarn config delete https-proxy

# Install app dependencies
RUN yarn install --frozen-lockfile

# Build the React app for production using Vite
RUN yarn build

# Use a lightweight HTTP server to serve the built files
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/reactapp

# Copy the built app from the previous stage
COPY --from=build /usr/src/reactapp/build ./build
COPY --from=build /usr/src/reactapp/node_modules ./node_modules

# Expose the port that the app will run on (if using Vite's default port, which is 3000)
EXPOSE 3000

# Start the HTTP server to serve the app
CMD ["npx", "serve", "build", "-s"]
