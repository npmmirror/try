// Promise resolve_100+ 规范：https://promisesaplus.com/
class myPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedArray = [];
        this.onRejectedArray = [];
        const resolve = (val) => {
            if (this.state === "pending") {
                this.state = 'resolved';
                this.value = val;
                this._doResolve();
            }
        };
        const reject = (rejectReason) => {
            if (this.state === "pending") {
                this.state = 'rejected';
                this.reason = rejectReason;
                this._doReject();
            }
        };
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onResolved, onRejected) {
        let promise2;
        promise2 = new myPromise((resolve, reject) => {

            // 遵循 2.2
            const afterResolved = value => {
                try {
                    typeof onResolved === "function"
                        ? resolvePromise(promise2, onResolved(value), resolve, reject)
                        : resolvePromise(promise2, value, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            };
            const afterRejected = reason => {
                try {
                    typeof onRejected === "function"
                        ? resolvePromise(promise2, onRejected(reason), resolve, reject)
                        : reject(reason);
                } catch (e) {
                    reject(e);
                }
            };

            // 2.1
            switch (this.state) {
                case "pending":
                    this.onResolvedArray.push(afterResolved);
                    this.onRejectedArray.push(afterRejected);
                    break;
                case "resolved":
                    this.onResolvedArray.push(afterResolved);
                    this._doResolve();
                    break;
                case "rejected":
                    this.onRejectedArray.push(afterRejected);
                    this._doReject();
                    break;
            }
        });
        return promise2;
    }

    // 执行所有的 onResolved
    _doResolve() {
        // XXX: 模拟一下microTask
        Promise.resolve().then(() => {
            this.onResolvedArray.forEach(f => f(this.value));
            this.onResolvedArray = [];
        });
    }

    // 执行所有的 onRejected
    _doReject() {
        // XXX: 模拟一下microTask
        Promise.resolve().then(() => {
            // if(this.onRejectedArray.length ===0) console.error('Uncaught myPromise', this.reason && this.reason.message || this.reason);
            this.onRejectedArray.forEach(f => f(this.reason));
            this.onRejectedArray = [];
        });
    }

    // then(null, onRejected) 的别名
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static resolve(val) {
        return new myPromise((resolve) => {
            resolve(val);
        });
    }

    static reject(reason) {
        return new myPromise((resolve, reject) => {
            reject(reason);
        });
    }

    static all(promiseList) {
        return new myPromise((resolve, reject) => {
            const result = [];
            let count = 0;
            promiseList.forEach((item, index) => {
                item
                    .then(value => {
                        count++;
                        result[index] = value;
                        if (count === promiseList.length - 1) {
                            resolve(result);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        });
    }

    static race(promiseList) {
        return new myPromise((resolve, reject) => {
            promiseList.forEach(item => {
                item.then(resolve, reject);
            });
        });
    }

    // 下面两个是为了测试才加的

    static deferred() {
        let dfd = {};
        dfd.promise = new myPromise(function (resolve, reject) {
            dfd.resolve = resolve;
            dfd.reject = reject;
        });
        return dfd;
    }

    static defer() {
        let dfd = {};
        dfd.promise = new myPromise(function (resolve, reject) {
            dfd.resolve = resolve;
            dfd.reject = reject;
        });
        return dfd;
    }
}

// 处理onResolve返回promise时的情况
function resolvePromise(promise, x, resolve, reject) {
    let called = false;
    if (promise === x) {
        if (called) return;
        called = true;
        reject(new TypeError('promise 循环错误'));
        console.error('promise 循环错误');
        return;
    }
    try {
        if (Object.prototype.toString.call(x) === "[object Object]" || typeof x === "function") {
            const then = x.then;
            if (typeof then === "function") {
                then.call(
                    x,
                    value => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise, value, resolve, reject);
                    },
                    reason => {
                        if (called) return;
                        called = true;
                        reject(reason);
                    }
                );
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }
        } else {
            if (called) return;
            called = true;
            resolve(x);
        }
    } catch (e) {
        if (called) return;
        called = true;
        reject(e);
    }
}

try {
    module.exports = myPromise;
} catch (e) {

}
