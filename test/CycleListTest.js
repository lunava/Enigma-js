const assert = require('assert');
const c = require('../Enigma/CycleList');

describe ("test basic CycleList functionality", function () {
    it('should simple initialize', function () {
        let simple = new c.CycleList('CE');
        assert.equal('CE', simple.head);
    });
    it('should create a complete CycleList', function () {
        let complete = c.CycleList.list("(AB) (CD) (E)");
        assert.equal('AB', complete.head);
        assert.equal('CD', complete.tail.head);
        assert.equal(5, complete.size());
    });
    it('should add another cycle', function () {
        let add = new c.CycleList('AB');
        assert.equal('AB', add.head);
        add.addCycle('(C)');
        assert.equal('C', add.tail.head);
    });
})