const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());

// 导入controller middleware:
// const controller = require('./controller');
// 使用middleware:
// app.use(controller());

// add router middleware:
// app.use(router.routes());

const isProduction = process.env.NODE_ENV === 'production';

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());

let templating = require('./templating');
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));


// 导入controller middleware:
const controller = require('./controller');
// 使用middleware:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');

