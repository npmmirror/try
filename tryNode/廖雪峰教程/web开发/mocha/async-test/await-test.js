const assert = require('assert');
var fs = require('fs');
const hello = require('../async-hello');

describe('#hello.js', () => {
    describe('#sum()', () => {
        it('test async function', function (done) {
            fs.readFile('web开发\\mocha\\data.txt', function (err, data) {
                console.log(data.toString('utf-8'));
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
        });

        it('#async with done', (done) => {
            (async function () {
                try {
                    let r = await hello();
                    assert.strictEqual(r, 15);
                    done();
                } catch (err) {
                    done(err);
                }
            })();
        });

        it('#async function', async () => {
            let r = await hello();
            assert.strictEqual(r, 15);
        });
    });
});
