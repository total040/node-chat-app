var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    var createdTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${createdTime}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
    var createdTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current Location</a>');
    a.attr('href', message.url);
    li.text(`${message.from} ${createdTime}: `);
    li.append(a);
    jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    } , function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Browser does not support geo');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function () {
            locationButton.removeAttr('disabled').text('Send location');
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Getting geo failed...');
    });
});

