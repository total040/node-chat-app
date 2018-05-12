var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current Location</a>');
    a.attr('href', message.url);
    li.text(`message from: ${message.from}`);
    li.append(a);
    jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    } , function (data) {
        console.log('Acknowledgement: ', data);
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Browser does not support geo');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function (data) {
            console.log('Acknowledgement: ', data);
        });
    }, function () {
        alert('Getting geo failed...')
    });
});

