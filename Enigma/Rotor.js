/** Class representation of an Enigma rotor.
 * Used as a parent class to other.
 * @author Luis Navarrete
 */
class Rotor {
    constructor(name, permutation) {
        this.name = name;
        this.permutation = permutation;
    }

    /** @returns this rotor's alphabet**/
    getAlphabet() {
        return this.permutation.alphabet;
    }

    /** @returns {boolean} true if this rotor rotates.*/
    rotates() {
        return false;
    }

    /**@returns {boolean} return if this rotor is reflecting*/
    reflecting() {
        return false;
    }

    /** Sets the setting of this rotor to posn.
     * @param posn new setting of rotor.*/
    setPos(posn) {
      this.setting = posn;
    }

    /** Sets the setting of this rotor to the char index.
     * @param char in the alphabet*/
    setChar(char) {
        this.setting = this.permutation.alphabet.chars.indexOf(char);
    }

    /**Converts p according to the permutation of this rotor.
     * @param p character index*/
    //TODO check if using this.setting would break code
    convertForward(setting, p) {
        let contact = this.permutation.wrap(setting + p);
        let contactExited = this.permutation.permuteIndex(contact);
        return this.permutation.wrap(contactExited - setting);
    }


    /** Converts e according to the inverse of this rotor.
     * @param e char index*/
    convertBackward(setting, e) {
        let contact = this.permutation.wrap(setting + e);
        let contactExited = this.permutation.invertIndex(contact);
        return this.permutation.wrap(contactExited - setting);
    }

    /** @return true if this rotor's setting is at its notch.*/
    atNotch() {
        return false;
    }

    /**advance this rotor's setting by 1*/
    advance() {
    }

    /**Change the notch of this rotor;*/
    changeNotchPosition(s) {

    }

    /**@returns {the size of this alphabet}*/
    size() {
        return this.getAlphabet().size;
    }

}
exports.Rotor = Rotor;