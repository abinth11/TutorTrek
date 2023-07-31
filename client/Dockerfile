# Build stage
FROM node:14-alpine as build

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

# Production stage
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/reactapp

# Copy the built app and only necessary node_modules from the previous stage
COPY --from=build /usr/src/reactapp/build ./build
COPY --from=build /usr/src/reactapp/node_modules ./node_modules

# Expose the port that the app will run on (if using Vite's default port, which is 3000)
EXPOSE 3000

# Install a lightweight HTTP server to serve the app
RUN yarn global add serve
CMD ["serve", "build", "-s"]
