var expect = require('expect');

var {generateMessage} = require('./messages');

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