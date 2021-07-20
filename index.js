const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    userExists,
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

    socket.on('make_room', ({ uid, room, username}) => {
        // Create new user
        if (userExists(uid)) {
            return
        }

        const user = userJoin(uid, username, room);
  
        // Join
        socket.join(room)
  
        // Emit to user entered new room successfully
        socket.emit('joinSuccess', {
            room: room,
        })
  
        // Send users and room info
        io.in(room).emit('roomUsers', {
            users: getRoomUsers(room)
        });
    })

    socket.on('join_room', ({ uid, room, username }) => {
        if (userExists(uid)) {
            return
        }

        // Create new user
        const user = userJoin(uid, username, room);

        // TODO: Check if room exists
    
        // Join
        socket.join(room)
        
        // Emit to user entered new room successfully
        socket.emit("joinSuccess", {
            room: room,
        })
        
        // Send users and room info
        io.in(room).emit('roomUsers', {
            users: getRoomUsers(room)
        });
    })

    socket.on('start_game', ({ room }) => {
        io.in(room).emit('startGame')
    })

    socket.on("leave_game", ({ uid, room }) => {
        userLeave(uid)

        io.in(room).emit('roomUsers', {
            users: getRoomUsers(room)
        })
    })
 });
 
 const PORT = 4000 || process.env.PORT;
 
 server.listen(PORT, () => console.log(`Server running on port ${PORT}`));