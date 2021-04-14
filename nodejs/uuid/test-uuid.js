const uuid = require("uuid");

const v1 = uuid.v1();
const v3 = uuid.v3("http://baidu.com", uuid.v3.URL);
const v4 = uuid.v4();
const v5 = uuid.v5("http://baidu.com", uuid.v5.URL);

console.log({
  v1,
  v3,
  v4,
  v5,
});
