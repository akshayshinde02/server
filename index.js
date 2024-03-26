const { Server } = require("socket.io");
const express = require('express');
const http = require('http');
const cores = require('cors');
const app = express();
const server = http.createServer(app); // Create HTTP server using Express app

const io = new Server(server, {
    cors: {
        origin: "*", // Allow requests from all origins
        methods: ["GET", "POST"],
        credentials: true // Allow cookies to be sent
      }
});

app.use(cores())

  app.get('/', (req, res) => {
    console.log('Called');
    res.status(200).send('Status Ok');
  });
  

    console.log("called api") 

    // if (io) {
    //     console.log("socket already running")
    // } else {
        // const io = new Server(res.socket.server)
        // res.socket.server.io = io
    
        io.on('connection', (socket) => {
            console.log("server is connected")

            socket.on('join-room', (roomId, userId) => {
                console.log("Jai Hind")
                console.log(`a new user ${userId} joined room ${roomId}`)
                socket.join(roomId)
                console.log("Shinde 1")
                socket.broadcast.to(roomId).emit('user-connected', userId)
                console.log("Shinde 2")
            })

            socket.on('user-toggle-audio', (userId, roomId) => {
                console.log("Akshay in Audiio")
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-toggle-audio', userId)
            })
            
            socket.on('user-toggle-video', (userId, roomId) => {
                console.log("Akshay in Vidio")
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-toggle-video', userId)
            })
            
            socket.on('user-leave', (userId, roomId) => {
                console.log("Akshay in Leave")
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-leave', userId)
            })
        })
    // }
    // res.end();

    server.listen(3002, () => {
        console.log('Server running on port 3002');
      });