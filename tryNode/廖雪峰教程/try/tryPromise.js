let task1 = function () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('task1 finished');
        }, 2000)
    });
};

// let timeLimitTask = function () {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject('time out');
//         }, 3000)
//     })
// };

// Promise.race([task1(), timeLimitTask()])
//     .then(res=>console.log('1',res))
//     .catch(res=>console.log('2',res));

/**
 * 构造一个限时任务容器
 * @param timeLimit
 * @return {function(*): *}
 * @constructor
 */
function TimeLimiter({timeLimit}) {
    timeLimit = timeLimit || 60000; // 默认为60秒超时
    let timeLimitTask = function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('timeout. Limit is ' + timeLimit));
            }, timeLimit)
        })
    };
    /**
     * @param Promise
     * @return resolve(result) or reject(result) or reject(new Error('timeout'));
     */
    return function (task) {
        if (typeof task === "function")
            return Promise.race([task(), timeLimitTask()]);
        else if (typeof task === "object")
            return Promise.race([task, timeLimitTask()]);
    }
}

/**
 * 用于限制运行时间，超过限制时间会reject
 * @param task
 * @param timeLimit
 * @return Promise
 */
function limitTask({task, timeLimit}) {
    (timeLimit > 0) || (timeLimit = 60000); // 默认为60秒超时
    let timeLimitTask = function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error(`timeout. (Limit : ${timeLimit})`));
            }, timeLimit)
        })
    };
    if (typeof task === "function")
        return Promise.race([task(), timeLimitTask()]);
    else if (typeof task === "object")
        return Promise.race([task, timeLimitTask()]);
}

limitTask({
    timeLimit: 2000,
    task() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('finished');
            }, 1000)
        })
    }
}).then(res => console.log('ok', res))
    .catch(err => console.log('fail', err));
