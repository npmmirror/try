// import {DownloadTask} from './tryDownload';
const {DownloadTask} = require('./tryDownload');
const {comicToMarkDown} = require('./tryMarkdown');
const {getSomeComic, updateComicById} = require('./tryMysql');
const {getTimes, storeMarkdownAndHtml, appendData, ProgressPrinter} = require('./util');

async function storeComic({origin, urlFormat, pageSize, storePath, comic_name}) {
    return new Promise((resolve, reject) => {
        // const urlFormat = 'http://huangzihao.gz01.bdysite.com/test_img/img1%s.jpg';
        // const pageSize = 3;
        // const storePath = 'comics/001';
        // const comic_name = 'name';
        let progressPrinter = new ProgressPrinter({total: pageSize, name: comic_name});
        let newTask = new DownloadTask({
            urlFormat: urlFormat,
            pageNumber: pageSize,
            destination: storePath,
            onRun: status => {
                // console.log(JSON.stringify(status));
                progressPrinter.do();
            },
            onFinish: res => {
                // console.log(JSON.stringify(res))
            }
        }).start().then((res) => {
            let {markdown, html} = comicToMarkDown({
                origin,
                imgArray: res.imgArray,
                name: comic_name,
                cover: res.cover,
                destination: storePath
            });
            // console.log({markdown, html});
            resolve({markdown, html})
        }).catch(reject);
    })
}

// testFunc();

async function start() {
    let comics = await getSomeComic({limit: 10});
    if (comics.length === 0) throw -1;
    // console.log(comics);
    for (let comicItem of comics) {
        try {
            // console.log(comicItem.name);
            let storePath = `comics/${getTimes()}/`;
            let {markdown, html} = await storeComic({
                origin: comicItem.origin_host + comicItem.origin_path,
                urlFormat: comicItem.img_url_format,
                pageSize: comicItem.page_number,
                storePath,
                comic_name: comicItem.name,
            });
            await storeMarkdownAndHtml({markdown, html, storePath});
            appendData(Object.assign(comicItem, {
                origin: comicItem.origin_host + comicItem.origin_path,
                urlFormat: comicItem.img_url_format,
                pageSize: comicItem.page_number,
                storePath,
                storePathFormat: `${storePath}img%s.jpg`,
                comic_name: comicItem.name,
            }));
            let affect = await updateComicById({
                comic_id: comicItem.comic_id,
                store_url_format: `${storePath}img%s.jpg`,
                store_path: storePath
            });
            console.log(`FINISH: ${comicItem.name}\n`);
            // console.log('SQL affect:', affect);
        } catch (e) {
            let affect = await updateComicById({
                comic_id: comicItem.comic_id,
                store_url_format: `fail`,
                store_path: `fail`
            });
            console.log(`FAIL: ${comicItem.name}`);
        }
    }
    return 0;
}


~async function () {
    for (let i = 0; i < 1000; i++) {
        try {
            await start()
        } catch (err) {
            console.error(err);
            process.exit(-1);
            break;
        }
    }
}();
