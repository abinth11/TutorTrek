import express, { Application, NextFunction } from 'express';
import connectToMongoDb from './frameworks/database/mongodb/connection';
import http from 'http';
import serverConfig from './frameworks/webserver/server';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
import connection from './frameworks/database/redis/connection';
import colors from 'colors.ts';
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandling';
import configKeys from './config'; 
import AppError from './utils/appError';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './types/socketInterfaces';
import { Server } from 'socket.io';
import socketConfig from './frameworks/websocket/socket';
import { authService } from './frameworks/services/authService';

colors?.enable();

const app: Application = express();
const server = http.createServer(app);

//* web socket connection
const io = new Server<ClientToServerEvents,ServerToClientEvents,InterServerEvents,SocketData>(server,{
  cors:{
      origin:configKeys.ORIGIN_PORT,
      methods:["GET","POST"]
  } 
});

socketConfig(io,authService())  

//* connecting mongoDb 
connectToMongoDb();

//* connection to redis
const redisClient = connection().createRedisClient();

//* express config connection
expressConfig(app);

//* routes for each endpoint
routes(app, redisClient);

//* handles server side errors
app.use(errorHandlingMiddleware);

//* catch 404 and forward to error handler
app.all('*', (req, res, next: NextFunction) => {
  next(new AppError('Not found', 404));
});

//* starting the server with server config
serverConfig(server).startServer();

export type RedisClient = typeof redisClient;
