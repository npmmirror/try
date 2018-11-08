const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const user = require('./tryAxios');



// log request URL:
app.use(async (ctx, next) => {
    console.log(`${Date()}: ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

//打印响应时间
app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

router.post('/wxLogin', async (ctx, next) => {
    const code = ctx.request.body.code || '';
    if (!code) {
        ctx.response.body = '未传递code'
    }
    else {
        ctx.response.body = await user.wxLogin(code);
        console.log('ok', ctx.response.body);
    }
});

app.use(bodyParser());



app.on('error', (err, ctx) => {
        console.error('server error', err);
    }
);

// 捕获错误
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        // ctx.response.body = {
        //     code:err.code,
        //     message: err.message
        // };
        ctx.response.body = err;
        // 捕获后需要触发error app.on('error')才能监听到
        ctx.app.emit('error', err, ctx);
    }
});

app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
