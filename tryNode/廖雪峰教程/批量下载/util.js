const fs = require('fs');
const readline = require('readline');

exports.getTimes = function () {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`
};

exports.storeMarkdownAndHtml = async function ({markdown, html, storePath}) {
    return new Promise((resolve, reject) => {
        fs.writeFile(storePath + '/preview.md', markdown, function (err) {
            if (err) {
                reject(err);
            } else {
                fs.writeFile(storePath + '/preview.html', html, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    })
};

let jsonData = {
    get() {
        try {
            return fs.readFileSync('comic_data.json', 'utf-8');
        } catch (e) {
            return '[]';
        }
    },
    set(data) {
        if (typeof data !== 'string') throw Error(`Data type should be string instead of ${typeof data}`);
        try {
            fs.writeFileSync('comic_data.json', String(data));
        } catch (e) {
            throw e;
        }
    }
};

exports.appendData = function (newData) {
    let originalData = JSON.parse(jsonData.get());
    if (originalData instanceof Array) {
        jsonData.set(JSON.stringify(originalData.concat(newData)));
    } else {
        jsonData.set(JSON.stringify(originalData.push(newData)));
    }
};

// exports.append([{a:1}]);
exports.ProgressPrinter = function ({total, name}) {
    // console.log('\n');
    this.total = total;
    this.finished = 0;
    this.do = function () {
        this.finished++;
        // //删除光标所在行
        // readline.clearLine(process.stdout, 0);
        // //移动光标到行首
        // readline.cursorTo(process.stdout, 0, 0);
        readline.clearLine();
        process.stdout.write(`\r${name} -- current: ${this.finished}  total:${this.total}`, 'utf-8');
        if (this.finished === this.total) {
            this.end();
        }
    };
    this.end = function () {
        process.stdout.write(`\n`);
        // process.stdout.write(`${name} finished.\n`);
    }
};

// function test2() {
//     let ProgressPrinter = exports.ProgressPrinter;
//     let count = 0;
//     let p = new ProgressPrinter({total: 5, name: 'test'});
//     console.log('start');
//     let a = () => {
//         if (count < 5) {
//             p.do();
//             setTimeout(a, 1000);
//             count++;
//         } else {
//             // p.end();
//             console.log('hhh')
//         }
//     };
//     setTimeout(a, 1000);
// }


/**
 * 用于限制运行时间，超过限制时间会reject
 * @param task
 * @param timeLimit
 * @return Promise
 */
function limitTask({task, timeLimit}) {
    (timeLimit > 0) || (timeLimit = 60000); // 默认为60秒超时
    let timeLimitTask = function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('time out');
                reject(new Error(`timeout. (Limit : ${timeLimit})`));
            }, timeLimit)
        })
    };
    if (typeof task === "function")
        return Promise.race([task(), timeLimitTask()]);
    else if (typeof task === "object")
        return Promise.race([task, timeLimitTask()]);
}

exports.limitTask = limitTask;

// function test3() {
//     limitTask({
//         timeLimit: 2000,
//         task: new Promise(resolve => {
//             setTimeout(() => {
//                 resolve('finished');
//             }, 1000)
//         })
//     }).then(res => console.log('ok', res))
//         .catch(err => console.log('fail', err));
// }

// test3();
