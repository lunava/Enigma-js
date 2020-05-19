/** Representation of a Linked List of permutation cycles.
 * @author Luis Navarrete Rios*/

class CycleList {
    constructor(head='', tail=null) {
        this.head = head;
        this.tail = tail;
    }

    /**Creates a linked list from a string.
     * @param cycles String of permutations
     * @return a fully linked list based on param
     */
    static list(cycles) {
        let result = null, pointer = null;
        let pattern = '\\(([^)]+)\\)';
        let match = cycles.matchAll(pattern);
        let lst = [...match];
        for (let elem of lst) {
            let cycle = elem[1]
            if (result == null) {
                result = new CycleList(cycle, null);
                pointer = result;
                continue;
            }
            pointer.tail = new CycleList(cycle, null);
            pointer = pointer.tail;
        }
        return result;
    }

    /**Adds a cycle to this CycleList.
     * @param cycle string representation of a cycle
     */
    addCycle(cycle) {
        for (let p = this; p != null; p = p.tail) {
            if (p.tail == null) {
                p.tail = list(cycle);
                break;
            }
        }
    }

    /** returns the number of characters in this permutation cycle.
     * @return int representing size
     */
    sizeOfCycle() {
        let size = 0;
        for (let p = this; p != null; p = p.tail) {
            size += p.head.length;
        }
        return size;
    }
}
exports.CycleList = CycleList;