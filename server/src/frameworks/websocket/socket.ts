import { Server } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '../../types/socketInterfaces';
import { AuthService } from '../services/authService';
import { groupMessageRepositoryMongoDb } from '../database/mongoDb/repositories/groupMessageRepositoryMongoDb';

const socketConfig = (io:Server<ClientToServerEvents,ServerToClientEvents,InterServerEvents,SocketData>,authService:ReturnType<AuthService>) =>{
    const addGroupMessage = async(courseId:string,userId:string,message:string) =>
        await groupMessageRepositoryMongoDb().addMessage(userId,courseId,message)
    

    io.use((socket,next)=>{
        if(socket.handshake.query && socket.handshake.query.token){
           const res:any = authService.verifyToken(socket.handshake.query.token as string)
           socket.data.userId=res.payload
           next()
        }
    })
    .on("connection",(socket)=>{
        console.log(`user connected ${socket.id}`.bg_magenta);  
        socket.on("join_room",(courseId)=>{
            socket.join(courseId)
            console.log(`user ${socket.id} joined ${courseId}`)
        })
    
        socket.on("send_message",async(data)=>{
            if(socket.data.userId){
                const res = await addGroupMessage(data.course,socket.data.userId,data.message)
                socket.to(data.course).emit("receive_message",res)
            }
        })
    
        socket.on("disconnect",()=>{
            console.log("disconnected",socket.id)
        })
    })
}

export default socketConfig

