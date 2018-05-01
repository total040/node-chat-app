const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
   console.log('new user connected');
   socket.emit('newMessage', {
      from: 'me',
       text: 'check it out',
       createdAt: 902332
   });

    socket.on('createMessage', (newMessage) => {
        console.log('new Message: ', newMessage);
    });

   socket.on('disconnect', () => {
      console.log('new user disconnected');
   });
});

app.use(express.static(publicPath));

server.listen(port, () => {
   console.log(`listening on port ${port}`);
});