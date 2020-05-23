const assert = require('assert');
const p = require('../Enigma/Permutation');
const a = require ('../Enigma/Alphabet');
const m = require('../Enigma/MovingRotor');
const nm = require('../Enigma/FixedRotor');
const r = require('../Enigma/Reflector');
const mach = require('../Enigma/Machine');
const alphabet = new a.Alphabet('ABCDEF');
const perm = new p.Permutation('(AB)', alphabet);
const permTwo = new p.Permutation('(DE)', alphabet);
const permReflector = new p.Permutation('(AD) (CB) (EF)', alphabet);
const mRotor = new m.MovingRotor('II', perm, 'C');
const rightMost = new m.MovingRotor('I', permTwo, 'D');
const reflector = new r.Reflector('IV', permReflector);
const fixed = new nm.FixedRotor('III', perm);
const rotors = [];
const plugBoard = new p.Permutation('(AF)', alphabet);
const insertRotors = ['IV', 'III', 'II', 'I'];


function addRotors() {
    rotors.push(mRotor);
    rotors.push(reflector);
    rotors.push(fixed);
    rotors.push(rightMost);
}
describe('Test basic machine functionality', function () {
    addRotors();
    it('should allow correct insertion', function () {
        let machine = new mach.Machine(alphabet, 4, 2, rotors);
        machine.insertRotors(insertRotors);
        for (let i = 0; i < machine.activeRotors.length; i += 1) {
            let expect = insertRotors[i];
            let actual = machine.activeRotors[i].name;
            assert.equal(expect, actual);
        }
    });
    it('should correctly set rotors to given setting', function () {
        let machine = new mach.Machine(alphabet, 4, 2, rotors);
        machine.insertRotors(insertRotors);
        machine.setRotors('ABC');
        assert.equal(0, fixed.setting);
        assert.equal(1, mRotor.setting);
        assert.equal(2, rightMost.setting);
    });
    it('should correctly convert char', function () {
        let machine = new mach.Machine(alphabet, 4, 2, rotors);
        machine.insertRotors(insertRotors);
        machine.setRotors('AAC');
        machine.setPlugboard(plugBoard);
        let word = 'BAD';
        assert.equal(machine.convertChar(1), 3);
        machine.setRotors('AAC');
        let convertedWord = machine.convertMsg(word);
        assert.equal(convertedWord, 'DEB');
        machine.setRotors('AAC');
        assert.equal(machine.convertMsg(convertedWord), 'BAD');
    });
})