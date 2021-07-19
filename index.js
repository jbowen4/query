const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: ['http://localhost:3006']
    }
  });

io.on('connection', socket => {
    const id = socket.handshake.query.id;

    socket.on('make_room', ({room, username}) => {
        // Create new user
        const user = userJoin(id, username, room);
  
        // Join
        socket.join(room)
  
        // Emit to user entered new room successfully
        socket.emit('joinSuccess', {
            room: user.room,
        })
  
        // Send users and room info
        io.to(room).emit('roomUsers', {
            users: getRoomUsers(user.room)
        });
    })

    socket.on('join_room', ({ room, username }) => {
        // Create new user
        const user = userJoin(id, username, room);
    
        // Join
        socket.join(room)
        
        // Emit to user entered new room successfully
        socket.emit("joinSuccess")
        
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    })
 });
 
 const PORT = 4000 || process.env.PORT;
 
 server.listen(PORT, () => console.log(`Server running on port ${PORT}`));