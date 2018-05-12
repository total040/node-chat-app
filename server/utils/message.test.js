var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./messages');

describe('generate message', () => {
    it('should generate message object', () => {
        var from = 'me';
        var text = 'text';
        var newMsg = generateMessage(from, text);
        expect(newMsg.from).toBe(from);
        expect(newMsg.text).toBe(text);
        expect(typeof newMsg.createdAt).toBe('number');
    });
});

describe('generate location message', () => {
    it('should generate location message object', () => {
        var from = 'me';
        var latitude = 1;
        var longitude = 1;
        var newLoc = generateLocationMessage(from, latitude, longitude);
        expect(newLoc.from).toBe(from);
        expect(newLoc.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(typeof newLoc.createdAt).toBe('number');
    });
});