let r1 = require("./r1");
let r2 = require("./r2");
console.log('r1',r1);
console.log('r2',r2);

console.log("\n");

r1.a = 2;


console.log('r1',r1);
console.log('r2',r2);


/*
这个测试中的依赖是
b1 <- r1 <-
   <- r2 <- last

实验可以看到，实际上r2和r1引用的是同一个对象 b1而不是新的对象
 */
