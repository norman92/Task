import assert from 'assert';
import defaultArguments from './';

describe('defaultArguments', function () {
    it('should set the default arguments of a function', function () {
        function add(a: number, b: number) {
            return a + b;
        }
        const add2 = defaultArguments(add, { b: 9 });
        assert.equal(add2(10), 19);
    });
});