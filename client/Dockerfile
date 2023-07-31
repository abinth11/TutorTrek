# Build stage
FROM node:16-alpine as build

# Set the working directory inside the container
WORKDIR /reactapp

# Copy only package.json and yarn.lock to leverage Docker caching for faster builds
COPY package.json yarn.lock ./

# Install all dependencies (including development dependencies for the build)
RUN yarn install --frozen-lockfile

# Copy the rest of the files to the container
COPY . .

# Build the React app for production 
RUN yarn build

# Production stage
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /reactapp

# Copy the built app and only necessary node_modules from the previous stage
COPY --from=build /reactapp/build ./build
COPY --from=build /reactapp/node_modules ./node_modules

# Expose the port that the app will run on 
EXPOSE 3000

# Install a lightweight HTTP server to serve the app
RUN yarn global add serve
CMD ["serve", "build", "-s"]
