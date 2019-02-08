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

exports.limitTask = limitTask;