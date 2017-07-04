require('should');
const wordwrap = require('../');

describe('break', () => {
    it('should wrap the text in two lines with length < 80 in hard mode', () => {
        const s =
            'Assert from {"type":"equal","ok":false,"found":1,"wanted":2,' +
            '"stack":[],"id":"b7ddcd4c409de8799542a74d1a04689b",' +
            '"browser":"chrome/6.0"}';
        const s_ = wordwrap.hard(80)(s);

        const lines = s_.split('\n');
        lines.length.should.equal(2);
        lines[0].length.should.be.below(80);
        lines[1].length.should.be.below(80);

        s_.replace(/\n/g, '').should.equal(s);
    });

    it('break', () => {
        const s = new Array(55 + 1).join('a');
        const s_ = wordwrap.hard(20)(s);

        const lines = s_.split('\n');
        lines.length.should.equal(3);
        lines[0].length.should.equal(20);
        lines[1].length.should.equal(20);
        lines[2].length.should.equal(15);
        s_.replace(/\n/g, '').should.equal(s);
    });
});
