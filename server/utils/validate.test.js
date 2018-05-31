var expect = require('expect');

var {isRealString} = require('./validate');

const non_string = 90;
const empty_string = '   ';
const str = '  Mike';

describe('validate isRealString', () => {
    it('should reject non-string', () => {
        var reject = isRealString(non_string);
        expect(reject).toBe(false);
    });

    it('should reject empty string', () => {
        var reject = isRealString(empty_string);
        expect(reject).toBe(false);
    });

    it('should validate string', () => {
        var pass = isRealString(str);
        expect(pass).toBe(true);
    });
});