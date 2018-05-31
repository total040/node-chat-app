const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/messages');
const {isRealString} = require('./utils/validate');
var {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required!');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat application!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} connected`));
        callback();
    });

    socket.on('createMessage', (newMessage, callback) => {
        console.log('new Message: ', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback();
    });

    socket.on('createLocationMessage', (position, callback) => {
        socket.broadcast.emit('newLocationMessage', generateLocationMessage('Admin', position.latitude, position.longitude));
        callback('Location from server!');
    });

   socket.on('disconnect', () => {
      var user = users.removeUser(socket.id);
      if (user) {
          io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
          io.to(user.room).emit('newMessage', generateMessage('Admin', `user ${user.name} has left`));
      }
   });
});

app.use(express.static(publicPath));

server.listen(port, () => {
   console.log(`listening on port ${port}`);
});