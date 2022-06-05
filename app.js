const express = require('express');
const app = express();
const http = require('http');
const { encode } = require('querystring');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const messages = []


io.on('connection', (socket) => {
    const username = socket.handshake.query.username
    socket.on('message', (data) => {
        const message = {
            message: data.message,
            senderUsername: username,
            sentAt: Date.now()
        }
        messages.push(message)
        io.emit('message', message)
        console.log(JSON.stringify(messages), )
    })
});

// server.listen(8080, "192.168.100.220", () => {
//     console.log('listening on *:8080');
// });

server.listen(8080, () => {
    console.log('listening on *:8080');
});