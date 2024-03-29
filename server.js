const express = require("express");
const app=express();
const http= require("http");
const {Server}= require("socket.io");
const cors= require('cors');

app.use(cors());
const server=http.createServer(app);
const io= new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});

io.on("connection",(socket)=>{
    console.log(`Connected User": ${socket.id}`);

    socket.on("smessage",(data)=>{
        socket.broadcast.emit("rmessage", data);
    })
});

server.listen(3001,()=>{
    console.log("ok");
})