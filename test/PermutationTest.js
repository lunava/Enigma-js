const assert = require('assert');
const p = require('../Enigma/Permutation');
const a = require('../Enigma/Alphabet');
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

describe('test basic Permutation functionality', function () {
    it('should allow simple initialization', function () {
        let testAlphabet = new a.Alphabet();
        let exCycles = '(AB) (DE)';
        let perm = new p.Permutation(exCycles, testAlphabet);
        assert.equal(alpha, perm.alphabet.chars);
    });
})
describe('test more advanced functionality', function () {
    it('should correctly identify id input', function () {
        let alphabet = new a.Alphabet(alpha);
        let perm = new p.Permutation('', alphabet);
        checkPerm(perm, alpha, alpha);
    });
    it ('should allow permutation, inversion, derangement', function () {
       let sample = 'ABCD', toSample = 'BADC';
       let testAlphabet = new a.Alphabet(sample);
       let exCycle = '(AB) (CD)', incompleteCycle = '(AB)';
       let perm = new p.Permutation(exCycle, testAlphabet);
       let perm2 = new p.Permutation(incompleteCycle, testAlphabet);
       assert.equal(true, perm.isDerangement());
       assert.equal(false, perm2.isDerangement());
       checkPerm(perm, sample, toSample);
    });
})
function checkPerm(perm, fromAlpha, toAlpha) {
    let N = fromAlpha.length;
    assert.equal(N, perm.size);
    for (let i = 0; i < N; i += 1) {
        let c = fromAlpha.charAt(i), e = toAlpha.charAt(i);
        let t = perm.permuteChar(c);
        assert.equal(e, perm.permuteChar(c));
        assert.equal(c, perm.invertC(e));
        let ci = alpha.indexOf(c), ei = alpha.indexOf(e);
        assert.equal(ei, perm.permuteIndex(ci));
        assert.equal(ci, perm.invertIndex(ei));
    }
}