/** Representation of an Enigma Machine.
 * @author Luis Navarrete
 * */
const e = require('./EnigmaError');
const Reflector = require('./Reflector');
const MovingRotor = require('./MovingRotor');

class Machine {
    //TODO Finish this
    constructor(alphabet, numRotors, pawls, allRotors) {
        if (numRotors <= 1 || allRotors.size <= 1) {
            throw e.EnigmaError.Error('Invalid num of rotors')
        }
        this.alphabet = alphabet;
        this.numRotors = numRotors;
        this.pawls = pawls;
        this.allRotors = allRotors;
        this.activeRotors = [];
        this.rotorSettings = '';
        this.plug = null;
    }
    insertRotors(rotors) {
        let index = 0;
        for (let rotor of rotors) {
            this.activeRotors[index] = this.getRotor(rotor);
            index ++;
        }
        if (!(this.activeRotors[0] instanceof Reflector.Reflector)) {
            throw e.EnigmaError.error('Leftmost rotor has to be a reflector')
        }
        for (let i = this.pawls; i < this.numRotors; i ++) {
            if (!(this.activeRotors[i] instanceof  MovingRotor.MovingRotor)) {
                throw e.EnigmaError.error('Rotor needs to be moveable');
            }
        }
    }
    getRotor(rotorName) {
        let match;
        for (let rotor of this.allRotors) {
            if (rotor.name == rotorName) {
                match = rotor;
            }
        }
        return match;
    }
    setRotors(rotorSettings) {
        this.rotorSettings = rotorSettings;
        let canSet = 0;
        for (let rotor of this.activeRotors) {
            if (!(rotor instanceof Reflector.Reflector)) {
                canSet += 1;
            }
        }
        if (rotorSettings.length != canSet) {
            throw e.EnigmaError.error('Wrong args for setting');
        }
        for (let i = canSet; i > 0; i -=1) {
            let rotorSetting = rotorSettings.charAt(i - 1);
            this.activeRotors[i].setChar(rotorSetting);
        }
    }
    setPlugboard(plugB) {
        this.plug = plugB;
    }

    /**Converts the input int c as a char within the alphabet
     * @param c an int
     * @returns a converted index representing a new character
     */
    convertChar(c) {
        this.advanceNotches();
        let convertInt = this.plugboardPermute(c);
        for (let i = this.activeRotors.length - 1; i >= 0; i -= 1) {
            let r = this.activeRotors[i];
            let s = r.convertForward(convertInt);
            convertInt = r.convertForward(convertInt);
        }
        for (let i = 1; i < this.activeRotors.length; i += 1) {
            let r = this.activeRotors[i];
            convertInt = r.convertBackward(convertInt);
        }
        return this.plugboardInvert(convertInt);
    }
    advanceNotches() {
        let checkAdv = [];
        for (let i = 0; i < this.activeRotors.length; i += 1) {
            if (this.activeRotors[i].atNotch()) {
                checkAdv[i] = true;
            } else {
                checkAdv[i] = false;
            }
        }
        this.activeRotors[this.activeRotors.length - 1].advance();
        for (let i = this.activeRotors.length - 1; i > this.pawls - 1; i -= 1) {
            if (this.activeRotors[i - 1].rotates() && checkAdv[i]) {
                this.activeRotors[i - 1].advance();
            }
            if (i == this.activeRotors.length - 2
                && !checkAdv[i + 1]
                && checkAdv[i] && !checkAdv[i - 1]) {
                this.activeRotors[i].advance();
                break;
            }
        }
    }
    plugboardPermute(c) {
        let convert = c;
        if (this.plug != null) {
            convert = this.plug.permuteIndex(convert);
        }
        return convert;
    }
    plugboardInvert(c) {
        let convert = c;
        if (this.plug != null) {
            convert = this.plug.invertIndex(convert);
        }
        return convert;
    }
    convertMsg(msg) {
        let temp = msg.split('');
        let convertedChar = [];
        for (let i = 0; i < temp.length; i += 1) {
            if(this.alphabet.contains(temp[i])) {
                let index = this.alphabet.chars.indexOf(temp[i]);
                let convertIndex = this.convertChar(index);
                convertedChar[i] = this.alphabet.chars.charAt(convertIndex);
            } else if (isWhiteSpace(temp[i])) {
                convertedChar[i] = temp[i];
            } else {
                throw e.EnigmaError.error('letters not present in alphabet');
            }
        }
        return convertedChar.join('');
    }

    setRingSetting(ringSettings) {
        let canSet = 0;
        for (let rotor of this.activeRotors) {
            if (!(rotor instanceof Reflector.Reflector)) {
                canSet += 1;
            }
        }
        if (ringSettings.length < canSet) {
            throw e.EnigmaError.error('Wrong args for ring settings');
        }
        for (let i = canSet; i > 0; i -=1) {
            let t = ringSettings.charAt(i - 1);
            let s = this.rotorSettings.charAt(i - 1);
            let ringSetting = this.alphabet.chars.indexOf(t);
            let prevSetting = this.alphabet.chars.indexOf(s);
            this.activeRotors[i].setPos(prevSetting - ringSetting);
            if (this.activeRotors[i] instanceof MovingRotor.MovingRotor) {
                this.activeRotors[i].changeNotchPosition(ringSetting);
            }
        }

    }
}

/** Simple function that checks if a char is a whitespace character.
 * @param char
 * @returns true if char is whitespace
 */
function isWhiteSpace(char) {
    if ((char == ' ') || (char == '\t') || (char == '\n')) {
        return true;
    }
    return false;
}
exports.Machine = Machine;
