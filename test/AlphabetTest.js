
const assert = require('assert');
const a = require("../Enigma/Alphabet.js");

describe('Should be simple setup', function () {
    it('Should be no error', function () {
        let alpha = new a.Alphabet();
        assert.equal('ABCDEFGHIJKLMNOPQRSTUVWXYZ', alpha.chars);
        assert.equal(26, alpha.size, 'check correct size');
        assert.equal(true, alpha.contains('A'));
        assert.equal(false, alpha.contains('2'));
        assert.equal('B', alpha.toChar(1));
        assert.equal(1, alpha.toInt('B'));

    })
})
