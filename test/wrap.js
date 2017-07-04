require('should');
const wordwrap = require('../');

const fs = require('fs');
const idleness = fs.readFileSync(__dirname + '/idleness.txt', 'utf8');

describe('wrap', () => {
    it('stop 80', () => {
        const lines = wordwrap(80)(idleness).split(/\n/);
        const words = idleness.split(/\s+/);

        lines.forEach(line => {
            line.length.should.be.belowOrEqual(80);
            const chunks = line.match(/\S/) ? line.split(/\s+/) : [];
            chunks.should.deepEqual(words.splice(0, chunks.length));
        });
    });

    it('start 20 stop 60', () => {
        const lines = wordwrap(20, 100)(idleness).split(/\n/);
        const words = idleness.split(/\s+/);

        lines.forEach(line => {
            line.length.should.be.belowOrEqual(100);
            const chunks = line.split(/\s+/).filter(x => x.match(/\S/));
            chunks.should.deepEqual(words.splice(0, chunks.length));
            line.slice(0, 20).should.deepEqual(new Array(20 + 1).join(' '));
        });
    });
});
