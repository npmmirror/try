// 启动一个服务器
const {query} = require('./mysql');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser());

const router = require('koa-router')();
router.get('/video', async (ctx, next) => {
    const limit = ctx.query.limit || 10;
    const jsonp = ctx.query.jsonp;
    const res = await query(`SELECT * FROM video_list ORDER BY RAND() LIMIT ${limit};`);
    if(jsonp){
        ctx.response.body = jsonp + "("+ JSON.stringify(res[0]) + ")";
    }else {
        ctx.response.body = JSON.stringify(res[0]);
    }
});

app.use(router.routes());

app.listen(3001);
console.log('app started at port 3001...');
