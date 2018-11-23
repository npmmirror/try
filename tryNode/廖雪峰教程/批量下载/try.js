// import {DownloadTask} from './tryDownload';
const {DownloadTask} = require('./tryDownload');
const {comicToMarkDown} = require('./tryMarkdown');
const {getSomeComic, updateComicById} = require('./tryMysql');
const {getTimes, storeMarkdownAndHtml} = require('./util');

async function storeComic({origin, urlFormat, pageSize, storePath, comic_name}) {
    return new Promise((resolve, reject) => {
        // const urlFormat = 'http://huangzihao.gz01.bdysite.com/test_img/img1%s.jpg';
        // const pageSize = 3;
        // const storePath = 'comics/001';
        // const comic_name = 'name';
        let newTask = new DownloadTask({
            urlFormat: urlFormat,
            pageNumber: pageSize,
            destination: storePath,
            onRun: status => {
                // console.log(JSON.stringify(status));
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
        }).catch(err => reject);
    })
}

// testFunc();

async function start() {
    let comics = await getSomeComic({limit: 2});
    if (comics.length === 0) throw -1;
    // console.log(comics);
    for (let comicItem of comics) {
        console.log(comicItem);
        let storePath = `comics/${getTimes()}/`;
        let {markdown, html} = await storeComic({
            origin: comicItem.origin_host + comicItem.origin_path,
            urlFormat: comicItem.img_url_format,
            pageSize: comicItem.page_number,
            storePath,
            comic_name: comicItem.name,
        });
        await storeMarkdownAndHtml({markdown, html, storePath});
        console.log(`FINISH: ${comicItem.name}`);
        // let affect = await updateComicById({
        //     comic_id: comicItem.comic_id,
        //     store_url_format: `${storePath}img%s.jpg`,
        //     store_path: storePath
        // });
        // console.log('SQL affect:', affect);
    }
    return 0;
}

start().then(process.exit).catch(process.exit);

