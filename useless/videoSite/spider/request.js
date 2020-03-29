const
    axios = require('axios'),
    cheerio = require('cheerio'),
    eventproxy = require('eventproxy'),
    fs = require('fs');
const {addVideo} = require('./mysql');
const ep = new eventproxy();

function doRequest(pageLimit) {
    return new Promise(resolve => {

        let result = [];
        for (let pageNo = 1; pageNo <= pageLimit; pageNo++) {
            axios.get(`https://www.pixiu821.com/quanbu/index_1_${pageNo}.html`)
                .then(response => {
                    const list = parseUrl(response.data);
                    console.log(pageNo);
                    result[pageNo] = list;
                    // result = result.concat(list);
                    ep.emit('getList', list);
                })
                .catch(err => {
                    console.error(err);
                });
        }


        ep.after('getList', pageLimit, function () {
            // 当所有 'getList' 事件完成后的回调触发下面事件
            console.log(result);
            let li = [];
            for (let i = 1; i <= pageLimit; i++) {
                li = li.concat(result[i]);
            }
            resolve(li);
        });
    })
}

/**
 * 解析html，返回一个对象数组，其中包含着当前页面获得的所有记录
 * 对象结构 { type, secret_key, origin_id }
 * @param html
 */
function parseUrl(html) {
    const result = [];
    const $ = cheerio.load(html);
    const a_list = $('.gl_con li a');
    for (let i = 0, len = a_list.length; i < len; i++) {
        const item = a_list.eq(i);
        const img = item.find('img').eq(0);
        // 解析节点获得单条记录对象
        try {
            const type = item.attr('href').match(/^\/([a-z]+)/)[1];
            const secret_key = img.attr('src').match(/([^\/]+)\/1.jpg/)[1];
            const origin_id = item.attr('href').match(/\/([^\/]+\/[^\/]+\/[^\/]+).html/)[1];
            result.push({type, secret_key, origin_id});

        } catch (e) {
            // console.log(e)
        }
    }
    return result;
}

// 如何使用secret_key
// 视频链接：https://aicdn-20180326-1.mannersteel.com/M4bdKiLd/500kb/hls/index.m3u8
// 视频封面：https://video.vodstatic.com/B3TyZIm5/1.jpg
function getAll() {
    doRequest(53).then(li => {
        // 去重
        let occur = {};
        let result = [];
        li.forEach(item => {
            if (!occur[item.secret_key]) {
                occur[item.secret_key] = true;
                result.push(item);
            }
        });
        // 把爬到的数据存到一个js文件中
        fs.writeFileSync('videoListData.js', "videoData = " + JSON.stringify(result, null, "  "));
        getSqlList(result);
    });
}

// 把数组转换成sql方便插入到数据库中
function getSqlList(li) {
    const sqlList = li.map(item => {
        return `INSERT INTO video_list(type,secret_key,origin_id) VALUES ('${item.type}','${item.secret_key}','${item.origin_id}');`
    });
    console.log(JSON.stringify(sqlList, null, "  "));
    const sql = sqlList.join('\n');
    fs.writeFileSync('videoListData.sql', sql);
}

// 爬取第一页（用于每日更新数据）
function doUpdate() {
    doRequest(1).then(async li => {
        li.forEach(item => {
            addVideo(item).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err);
            })
        });

    })
}

doUpdate();