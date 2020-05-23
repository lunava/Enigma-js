/** Class representation of an Enigma rotor that is able to rotate.
 * @author Luis Navarrete
 * */
const Rotor = require('./Rotor');
class MovingRotor extends Rotor.Rotor{
    constructor(name, permutation, notches) {
        super(name, permutation);
        this.permutation = permutation;
        this.notches = notches;
        this.notchPositions = [];
        this.setting = 0;
        for (let i = 0; i < notches.length; i++) {
            let char = this.permutation.alphabet.chars;
            this.notchPositions[i] = char.indexOf(this.notches.charAt(i));
        }
        this.copy = this.notchCopy();
    }
    rotates() {
        return true;
    }

    notchCopy() {
        let replica = [];
        for (let i = 0; i < this.notchPositions.length; i++) {
            replica[i] = this.notchPositions[i];
        }
        return replica;
    }
    getAlphabet() {
        return super.getAlphabet();
    }

    advance() {
        this.setting +=1;
    }
    setChar(char) {
        return this.setting = this.getAlphabet().chars.indexOf(char);
    }
    setPos(posn) {
        this.setting = posn;
    }
    convertBackward(e) {
        return super.convertBackward(this.setting, e);
    }
    convertForward(p) {
        return super.convertForward(this.setting, p);
    }

    atNotch() {
        for (let i = 0; i < this.copy.length; i++) {
            if (this.permutation.wrap(this.setting) == this.copy[i]) {
                return true;
            }
        }
        return false;
    }
    changeNotchPosition(s) {
        for (let i = 0; i < this.notchPositions.length; i ++) {
            this.copy[i] = this.permutation.wrap(this.notchPositions[i] - s);
        }
    }
}
exports.MovingRotor = MovingRotor;