var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('createMessage', {
        to: 'him',
        text: 'check it out now!'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    console.log('Message: ', message);
});