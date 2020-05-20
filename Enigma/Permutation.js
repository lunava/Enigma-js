/** Class representation of permutation cycles.
 * @author Luis Navarrete
 */
class Permutation {
    /** Constructor for permutation class.
     * @param cycles CycleList of this permutation
     * @param alphabet String alphabet
     */
    constructor(cycles, alphabet) {
        this.cycles = cycles;
        this.alphabet = alphabet;
        this.size = alphabet.length;
    }
    addCycle(cycle) {
        this.cycles.addCycle(cycle);
    }

    /** Wraps this number.
     * @param i index of alphabet
     * @returns index wrap around size of alphabet*/
    wrap(i) {
        let r = p % this.size;
        if (r < 0) {
            r += size();
        }
        return r;
    }

    permuteIndex(index) {
        let alpha = this.alphabet.chars;
        let c = alpha.charAt(this.wrap(index));
    }
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
    charHelper(char, cycle) {
       if (cycle.indexOf(char) == cycle.length -1) {
           return cycle.charAt(0);
       }
       let index = cycle.indexOf(char);
       return cycle.charAt(index);
    }
    invert() {
        
    }
    invertedChar() {

    }
    


}