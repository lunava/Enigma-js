const assert = require('assert');
const p = require('../Enigma/Permutation');
const a = require('../Enigma/Alphabet');
const m = require('../Enigma/MovingRotor');
const fromAlpha = 'ABCDE';
const toAlpha = 'BADCE';
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const basicAlpha = new a.Alphabet(fromAlpha);
const basicCycle = '(AB) (CD)';
const basicPermutation = new p.Permutation(basicCycle, basicAlpha);


describe('test initialization of MovingRotor class', function () {
    it('should allow basic functionality', function () {
        let movRot = new m.MovingRotor('Test', basicPermutation, 'B');
        checkRotor(movRot, fromAlpha, toAlpha);

    });
})

describe('test with actual Enigma Rotor', function () {
    it('should correctly output Naval code', function () {
        let NavalAlpha = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
        let NavalCycle = '(AELTPHQXRU) (BKNW) (CMOY) (DFG) (IV) (JZ) (S)';
        let normaAl = new a.Alphabet();
        let rotor = createRotor('I', NavalCycle, normaAl, '')
        checkRotor(rotor, alpha, NavalAlpha);
    });
    it('should correctly transform with new setting', function () {
        let NavalAlphaZ = 'KFLNGMHERWAOUPXZIYVTQBJCSD';
        let NavalCycle = '(AELTPHQXRU) (BKNW) (CMOY) (DFG) (IV) (JZ) (S)';
        let normalAl = new a.Alphabet();
        let rotor = createRotor('I', NavalCycle, normalAl, '');
        rotor.setPos(25);
        checkRotor(rotor, alpha, NavalAlphaZ);
        rotor.setChar('Z');
        checkRotor(rotor, alpha, NavalAlphaZ)
    });
})
function createRotor(name, cycle, alphabet, notches) {
    return new m.MovingRotor(name, new p.Permutation(cycle, alphabet), notches);
}
function checkRotor(rotor, fromAlpha, toAlpha) {
    let N = fromAlpha.length;
    assert.equal(N, rotor.size(), 'Make sure rotor has same length as alphabet');
    for (let i = 0; i < N; i++) {
        let c = fromAlpha.charAt(i), e = toAlpha.charAt(i);
        let ci = alpha.indexOf(c), ei = alpha.indexOf(e);
        let ex = rotor.convertForward(ci);
        assert.equal(ei, rotor.convertForward(ci), `error at ${i}`);
        assert.equal(ci, rotor.convertBackward(ei));
    }
}