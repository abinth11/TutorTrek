export interface ServerToClientEvents {
    receive_message:(data:any)=>void,
    response_data:(data:any)=>void
}
  
export interface ClientToServerEvents {
    join_room:(data:string)=>void,
    send_message:(data:{message:string,course:string})=>void,
    request_data:(data:any)=>void
}
  
export interface InterServerEvents {
    
}
  
export interface SocketData {
    userId:string
}