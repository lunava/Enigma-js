/** Class representation of a reflector in an Enigma Machine.
 * Extends a FixedRotor superclass.
 * @author Luis Navarrete
 * */
const FixedRotor = require('./FixedRotor');
const rotor = require('./Rotor');
const e = require('./EnigmaError');

class Reflector extends rotor.Rotor {
    constructor(name, permutation) {
        super(name, permutation);
        if (!permutation.isDerangement()) {
            e.EnigmaError.error("Reflector has to be a derangement");
        }
        this.setting = 0;
    }
    reflecting() {
        return true;
    }
    setPos(posn) {
        if (posn != 0) {
            e.EnigmaError.error("reflector has only one position");
        }
    }
    rotates() {
        return false;
    }

    convertBackward(e) {
        return super.convertBackward(this.setting, e);
    }
    convertForward(p) {

        return super.convertForward(this.setting, p);
    }
}
exports.Reflector = Reflector;