import assert from 'assert';
import defaultArguments from './';

describe('defaultArguments', function () {
    it('should set the default arguments of a function', function () {
        function add(a: number, b: number) {
            return a + b;
        }
        const add2 = defaultArguments(add, { b: 9 });
        assert.equal(add2(10), 19);
        assert.equal(add2(10, 7), 17);
    });

    it('should set the default arguments when passing a function though again.', function () {
        function add(a: number, b: number) {
            return a + b;
        }
        const add2 = defaultArguments(add, { b: 9 });
        const add3 = defaultArguments(add2, { b: 3, a: 2 });
        assert.equal(add3(10), 13);
        assert.equal(add3(), 5);
        assert.equal(add3(undefined, 10), 12);
    });
});