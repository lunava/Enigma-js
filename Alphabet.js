/** Representation of an Alphabet.
 * @author Luis Navarrete
 */
 class Alphabet{

    constructor(chars) {
        if (this.validInput(chars)) {
            this.chars = chars;
            this.size = chars.length();
        }
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
}