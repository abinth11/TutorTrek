import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '../../types/socketInterfaces';
import { AuthService } from '../services/authService';
import AppError from '../../utils/appError';
import HttpStatusCodes from '../../constants/HttpStatusCodes';

 const socketConfig = (
  io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
  authService: ReturnType<AuthService>
) => { 
  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      const res: any = authService.verifyToken(socket.handshake.query.token as string);
      socket.data.userId = res.payload;
      next(); 
    } else {
      next(new AppError('Authentication token not provided',HttpStatusCodes.UNAUTHORIZED));
    }
  }).on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
    console.log(`User connected: ${socket.id}`.bg_magenta);
      // sendProgress();
      socket.on('request_data', () => {
        // Process your data retrieval logic here
        const data = { message: 'Hello from the server!' };
    
        // Emit a custom event with the data
        socket.emit('response_data', data); 
      }); 
  
      
    socket.on('join_room', (courseId: string) => {
      socket.join(courseId);
      console.log(`User ${socket.id} joined room ${courseId}`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    

  });
};

export default socketConfig;
