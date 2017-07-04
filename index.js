var wordwrap = (module.exports = function(start, stop, params) {
    if (typeof start === 'object') {
        params = start;
        start = params.start;
        stop = params.stop;
    }

    if (typeof stop === 'object') {
        params = stop;
        start = start || params.start;
        stop = undefined;
    }

    if (!stop) {
        stop = start;
        start = 0;
    }

    if (!params) params = {};
    var mode = params.mode || 'soft';
    var len = params.lengthFn || _len;
    var re = mode === 'hard' ? /\b/ : /(\S+\s+)/;
    var prefix = new Array(start + 1).join(' ');

    return function(text) {
        var chunks = text.toString().split(re).reduce(function(acc, x) {
            if (mode === 'hard') {
                for (var i = 0; i < len(x); i += stop - start) {
                    acc.push(x.slice(i, i + stop - start));
                }
            } else acc.push(x);
            return acc;
        }, []);

        chunks = chunks.reduce(
            function(lines, rawChunk) {
                if (rawChunk === '') return lines;

                var chunk = rawChunk.replace(/\t/g, '    ');
                var i = lines.length - 1;
                var xs = chunk.split(/\n/),
                    curr = xs[0];

                if (
                    !(
                        len(lines[i]) + len(curr) > stop &&
                        len(lines[i]) + len(curr.replace(/\s+$/, '')) > stop &&
                        len(lines[i]) > start
                    )
                ) {
                    lines[i] += xs.shift();
                }

                xs.forEach(function(c) {
                    if (i === lines.length - 1) {
                        lines[i] = lines[i].replace(/\s+$/, '');
                        if (!lines[i]) lines[i] = prefix;
                    }
                    lines.push(prefix + c.replace(/^\s+/, ''));
                });

                return lines;
            },
            [prefix]
        );

        var last = chunks.length - 1;
        chunks[last] = chunks[last].replace(/\s+$/, '');
        if (!chunks[last]) chunks[last] = prefix;
        return chunks.join('\n');
    };
});

wordwrap.soft = wordwrap;

wordwrap.hard = function(start, stop) {
    return wordwrap(start, stop, { mode: 'hard' });
};

function _len(x) {
    return x.length;
}
