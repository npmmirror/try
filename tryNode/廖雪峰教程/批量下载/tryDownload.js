const download = require('download');
const PQueue = require('p-queue');

// function downloadImages(urlFormat, pageNumber, destination) {
//     if (arguments.length < 3) throw Error(`argument expect 3 but current ${arguments.length}`);
//     for (let i = 1; i <= pageNumber; i++) {
//         let fileName = urlFormat.replace('%s', i);
//         download(fileName, destination, {filename: `img${i}.jpg`}).then(() => {
//             console.log(/[^\/.]*.[^\/.]*$/.exec(fileName));
//             // 打印文件名
//         })
//     }
// }

function DownloadTask({urlFormat, pageNumber, destination, onRun, onFinish}) {
    // if (arguments.length < 3) throw Error(`Expect 3 arguments but current ${arguments.length}`);
    if (!destination) throw Error('Need destination.');
    this.urlFormat = urlFormat;
    this.pageNumber = pageNumber;
    this.destination = destination;
    this.onRun = onRun;
    this.onFinish = onFinish;
    this.status = {
        total: pageNumber,//总量
        count: 0,//已经下载的数量，不管是成功还是失败
        success: 0,//成功的数量
        fail: 0//失败数量
    };
    this.start = function () {
        return new Promise((resolve, reject) => {
            let extensionName = /(?<=.)[^.]*$/.exec(this.urlFormat);//文件拓展名，如 .jpg
            // /^.*?(?=.[^.]*$)/.exec(this.urlFormat); //获取除了拓展名的前缀，如 baidu.com/imgName
            let imgArray = [];
            let cover = null;
            let onFinally = () => {
                this.onRun && this.onRun(this.status);
                this.status.count++;
                if (this.status.count === this.pageNumber) {
                    let result = {
                        status: this.status,
                        destination: this.destination,
                        imgArray: imgArray.sort(),
                        cover
                    };
                    if (this.status.success > 0)
                        resolve(result);
                    else
                        reject(result);
                    this.onFinish && this.onFinish(result);
                }
            };

            download(this.urlFormat.replace('%s', ''), this.destination, {filename: `cover.${extensionName}`})
                .then(() => {
                    cover = `cover.${extensionName}`
                });

            let downloadQueue = new PQueue({concurrency: 10});
            for (let i = 1; i <= this.pageNumber; i++) {
                let downloadPath = this.urlFormat.replace('%s', i);
                downloadQueue.add(() => {
                    download(downloadPath, this.destination, {filename: `img${i}.${extensionName}`})
                        .then(() => {
                            this.status.success++;
                            imgArray.push(`img${i}.${extensionName}`);
                            onFinally();
                        })
                        .catch(() => {
                            this.status.fail++;
                            onFinally();
                        })
                })
            }
        })
    };
}

function testFunc() {
    const urlfmt = 'http://huangzihao.gz01.bdysite.com/test_img/img1%s.jpg';
    const pageSize = 4;
    const storePath = 'tmp/001/';
// downloadImages(urlfmt, pageSize, storePath);

    let newTask = new DownloadTask({
        urlFormat: urlfmt,
        pageNumber: pageSize,
        destination: storePath,
        onRun: status => {
            console.log(JSON.stringify(status));
        },
        onFinish: res => {
            console.log(JSON.stringify(res))
        }
    }).start();
};

// testFunc();
module.exports = {DownloadTask};
