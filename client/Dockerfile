FROM node:lts as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g typescript vite

COPY . .

RUN npm run build

FROM node:lts-slim

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npx", "serve", "dist", "-s"]