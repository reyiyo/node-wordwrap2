require('should');
const fs = require('fs');
const path = require('path');

const strip = require('strip-ansi');

const lib = require('../');

const file = fs.readFileSync(path.join(__dirname, 'ansi-colored.txt'), 'utf8');

describe('custom length', () => {
    it('should use custom length function', () => {
        const wrap = lib({
            start: 0,
            stop: 80,
            lengthFn: lengthFn
        });

        const wrapped = wrap(file.split('\n').join(' '));
        const control = strip(file);

        const wrappedLines = wrapped.split('\n');
        const controlLines = control.split('\n');

        wrappedLines.length.should.equal(controlLines.length);

        for (let i = 0; i < wrappedLines.length; ++i) {
            strip(wrappedLines[i]).length.should.equal(controlLines[i].length);
        }
    });
});

function lengthFn(chunk) {
    return strip(chunk).length;
}
