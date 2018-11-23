const fs = require('fs');
exports.getTimes = function () {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}@${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`
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
