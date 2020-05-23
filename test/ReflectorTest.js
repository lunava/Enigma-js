const assert = require('assert');
const p = require('../Enigma/Permutation');
const a = require('../Enigma/Alphabet');
const r = require('../Enigma/Reflector');

describe('test basic Reflector functionality', function () {
    it('should allow simple initialization', function () {
        let testAlphabet = new a.Alphabet('ABCD');
        let cycles = '(AB) (CD)';
        let perm = new p.Permutation(cycles, testAlphabet);
        let reflector = new r.Reflector('Test', perm)
        checkReflector(reflector);
    });
    it('should catch basic errors', function () {
        let testAlphabet = new a.Alphabet('ABCD');
        let cycle = '(AB) (C)';
        let perm = new p.Permutation(cycle, testAlphabet);
        assert.throws(function () {
            new r.Reflector('test', perm);
        }, Error);
        })
})
function checkReflector(reflector) {
    assert.equal(false, reflector.atNotch());
    assert.equal(true, reflector.reflecting());
}