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
    console.log(`${displayName} connected.`);
  });

  // When a user sends a chat message (for future enhancement)
  socket.on('chatMessage', (message) => {
    // Currently, this server does not handle chat messages
    // You can add chat functionality here if desired
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      console.log(`${users[socket.id]} disconnected.`);
      delete users[socket.id];
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
￼Enter
