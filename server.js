// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

// Store display names of users (socket.id to display name mapping)
const users = {};

io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  // When a user sets their display name
  socket.on('setDisplayName', (displayName) => {
    users[socket.id] = displayName;
  });

  // When a user sends a chat message
  socket.on('chatMessage', (message) => {
    // Broadcast the message to all connected peers (including sender)
    io.emit('chatMessage', { sender: users[socket.id], message });
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected: ', socket.id);
    delete users[socket.id];
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
