/** Class representation of a rotor that does not move.
 * @author Luis Navarrete Rios
 */
const Rotor = require('./Rotor');

class FixedRotor extends Rotor.Rotor{
    constructor(name, permutation) {
        super(name, permutation);
        this.setting = 0;
    }
    setPos(posn) {
        this.setting = posn;
    }
    setChar(char) {
        this.setting = this.getAlphabet().chars.indexOf(char);
    }
    rotates() {
        return false;
    }
    convertForward(p) {
        return super.convertForward(this.setting, p);
    }
    convertBackward(e) {
        return super.convertBackward(this.setting, e);
    }
}
exports.FixedRotor = FixedRotor;