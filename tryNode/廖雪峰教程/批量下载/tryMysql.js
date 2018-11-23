const Sequelize = require('sequelize');

const mysql_config = {
    "dialect": "mysql",
    "database": "comics_site",
    "username": "hzh",
    "password": "1q2w3e4r5t",
    "host": "193.112.1.213",
    "port": 3306
};

var sequelize = new Sequelize(mysql_config.database, mysql_config.username, mysql_config.password, {
    host: mysql_config.host,
    dialect: 'mysql',
    timezone: '+08:00', //东八时区（非常重要，不然时区不对会有问题！！！）
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

async function getSomeComic(param) {
    let limit = 10;
    if (param && param.limit) limit = param.limit;
    let sql = `SELECT * FROM comics_list WHERE store_path = 'default_path' AND img_url_type = 1 AND page_number > 0 AND state = 1 AND valid = 1 LIMIT ${limit};`;
    let result = await sequelize.query(sql);
    let comicList = result[0];
    if (comicList.length) {
        // console.log(JSON.stringify(comicList));
        return comicList;
    }
}

// getSomeComic({limit:15});

async function updateComicById({comic_id, store_path, store_url_format}) {
    let sql = `UPDATE comics_list SET store_path='${store_path}', store_url_format='${store_url_format}' WHERE comic_id = ${comic_id};`
    let result = await sequelize.query(sql);
    // console.log(result);
    return result && result[0].affectedRows;
}

// updateComicById({
//     comic_id:492,
//     store_url_format:'s',
//     store_path:'b'
// }).then(function (affect) {
//     console.log('affect',affect);
// });

module.exports = {getSomeComic, updateComicById};
