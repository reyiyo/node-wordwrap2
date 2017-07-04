require('should');
const wordwrap = require('../');

describe('bugs issue #3', () => {
    it('bug1', () => {
        const text = 'I love u\n\n\n';
        let res = wordwrap(10)(text);
        res.should.equal('I love u\n\n\n');
    });

    it('bug2', () => {
        const text = 'I hug you, my friend';
        const res = wordwrap(10)(text);
        res.should.equal('I hug you,\nmy friend');
    });

    it('bug3', () => {
        const text = 'I love u\n\n\n';
        const res = wordwrap.hard(10)(text);
        res.should.equal('I love u\n\n\n');
    });

    it('bug4', () => {
        const text = 'I hug you, my friend';
        const res = wordwrap.hard(10)(text);
        res.should.equal('I hug you,\nmy friend');
    });

    it('bug5', () => {
        const text = '12345678910';
        const res = wordwrap(10)(text);
        res.should.equal('12345678910');
    });

    it('bug6', () => {
        const text = '\n12345678910\n';
        const res = wordwrap(1, 11)(text);
        res.should.equal(' \n 12345678910\n ');
    });
});
