const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    const id = socket.handshake.query.id;
    
 });
 
 const PORT = 4000 || process.env.PORT;
 
 server.listen(PORT, () => console.log(`Server running on port ${PORT}`));