# Use the official Node.js LTS image (version 18) as the base image for build stage
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /usr/src/reactapp

# Copy only package.json and yarn.lock to leverage Docker caching for faster builds
COPY package.json yarn.lock ./

# Install app dependencies (only production dependencies)
RUN yarn install --frozen-lockfile --production

# Copy the rest of the files to the container
COPY . .

# Build the React app for production using Vite
RUN yarn build

# Use a smaller base image for the final stage
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/reactapp

# Copy the built app and only necessary node_modules from the previous stage
COPY --from=build /usr/src/reactapp/build ./build
COPY --from=build /usr/src/reactapp/node_modules ./node_modules

# Expose the port that the app will run on (if using Vite's default port, which is 3000)
EXPOSE 3000

# Start the HTTP server to serve the app
CMD ["npx", "serve", "build", "-s"]
