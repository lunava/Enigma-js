/** Representation of an Alphabet.
 * @author Luis Navarrete
 */
 class Alphabet{
    /** Constructor for alphabet, accounts for size and chars.
     * @param chars characters used for making alphabet
     */
    constructor(chars=null) {
        if (chars == null) {
            this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        else if (this.validInput(chars)) {
            this.chars = chars;
        }
        else{
            throw new EnigmaError('Invalid Args');
        }
        this.size = this.chars.length;
    }

    /**Checks if this alphabet input is valid.
     * @param chars character representation
     */
    validInput(chars) {
        let charArray = chars.toArray();
        let alpha = new Map();
        for (let c of charArray) {
           if (alpha.has(c)) {
               return false;
           }
           alpha.set(c, 1);
        }
        return true;
    }

    /** Returns true if ch is in this alphabet.
     * @param ch character*/
    contains(ch) {
        return this.chars.indexOf(ch) >= 0;
    }

    /** returns char representation of this int.
     * @param num integer*/
    toChar(num) {
        return this.chars.charAt(num);
    }

    /** returns a int representation of this char.
     * @param ch character of alphabet*/
    toInt(ch) {
        return this.chars.indexOf(ch);

    }
}
exports.Alphabet = Alphabet;