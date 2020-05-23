/** Class representation of permutation cycles.
 * @author Luis Navarrete
 */
const e = require('./EnigmaError');
const c = require('./CycleList');
class Permutation {
    /** Constructor for permutation class.
     * @param cycles CycleList of this permutation
     * @param alphabet String alphabet
     */
    constructor(cycle, alphabet) {
        this.cycles = c.CycleList.list(cycle);
        this.alphabet = alphabet;
        this.size = alphabet.size;
    }

    /** Adds a cycle to this permutation
     * @param cycle to be added
     */
    addCycle(cycle) {
        this.cycles.addCycle(cycle);
    }

    /** Wraps this number.
     * @param i index of alphabet
     * @returns index wrap around size of alphabet*/
    wrap(p) {
        let r = p % this.size;
        if (r < 0) {
            r += this.size;
        }
        return r;
    }

    /**Permutes this index of the alphabet.
     * @param index in the alphabet
     * @returns index of the derangement
     */
    permuteIndex(index) {
        let alpha = this.alphabet.chars;
        let c = alpha.charAt(this.wrap(index));
        let newC = this.permuteChar(c);
        return alpha.indexOf(newC);
    }

    invertIndex(index) {
        let alpha = this.alphabet.chars;
        let c = alpha.charAt(this.wrap(index));
        let newC = this.invertC(c);
        return alpha.indexOf(newC);
    }

    /**Permutes this character
     * @param p character in the alphabet
     * @returns permutated character
     */
    permuteChar(p) {
        if (!this.alphabet.contains(p)) {
            throw new Error('Char not present in this alphabet');
        }else if (this.cycles != null) {
           for (let curr = this.cycles; curr != null; curr = curr.tail) {
               let cycle = curr.head;
               if (cycle.indexOf(p) >= 0) {
                   return this.charHelper(p, cycle);
               }
           }
        }
        return p;

    }

    /**helper method for char permutations.
     * @param char we are permuting
     * @param cycle cycle that this char belongs to
     * @returns {string} permuted character
     */
    charHelper(char, cycle) {
       if (cycle.indexOf(char) == cycle.length -1) {
           return cycle.charAt(0);
       }
       let index = cycle.indexOf(char);
       return cycle.charAt(index + 1);
    }

    /**Invert this char based on the permutation.
     * @param char we are permuting
     * @returns {*} permuted character
     */
    invertC(char) {
        if (!this.alphabet.contains(char)) {
            e.EnigmaError.error('char not present in alphabet');
        }
        if (this.cycles != null) {
            for (let curr = this.cycles; curr != null; curr = curr.tail) {
                let cycle = curr.head;
                 if (cycle.indexOf(char) >= 0) {
                     return this.invertedChar(char, cycle);
                 }
                }
        }
        return char;
    }

    /** helper function to invert character
     * @param c character to be permuted
     * @param cycle String that c belongs to.
     * @returns {string}
     */
    invertedChar(c, cycle) {
        if (cycle.indexOf(c) == 0) {
            return cycle.charAt(cycle.length - 1);
        }
        let i = cycle.indexOf(c);
        return cycle.charAt(i - 1);
    }

    /** @returns {boolean} returns a boolean if all
     * characters in alphabet have a permuted counterpart.*/
    isDerangement() {
        if (this.cycles.size() != this.alphabet.size) {
            return false;
        }
         return true;
    }

}
exports.Permutation = Permutation;