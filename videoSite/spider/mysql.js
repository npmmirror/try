// 用于操作数据库。。。但是最后没有用到
const Sequelize = require('sequelize');
// import Sequelize from 'Sequelize';
const mysqlConfig = {
    "dialect": "mysql",
    "database": "mydb",
    "username": "user",
    "password": "psw",
    "host": "localhost",
    "port": 3306
};

var sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
    host: mysqlConfig.host,
    dialect: 'mysql',
    timezone: '+08:00', //东八时区（非常重要，不然时区不对会有问题！！！）
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    logging: function (sql) {
        // do nothing
    }
});

async function getAllVideo() {
    let sql = `SELECT * FROM video_list;`;
    const result = await sequelize.query(sql);
    console.log(result);
    return result;
}

async function addVideo({type = null, secret_key, origin_id = null}) {
    const sql = `INSERT INTO video_list(type,secret_key,origin_id) VALUES ('${type}','${secret_key}','${origin_id}');`;
    return await sequelize.query(sql);
}

// addVideo({
//     type: 'leihou',
//     secret_key: 'aaaa',
//     origin_id: 'aaa/dddd'
// }).then(res=>{
//     console.log(res);
// })
async function query(sql){
    return await sequelize.query(sql);
}


module.exports = {getAllVideo, addVideo, query};