const { Server } = require("socket.io");

const io = new Server(3002, {
    cors:true,
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

