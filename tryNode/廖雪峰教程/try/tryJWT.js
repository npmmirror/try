const jwt = require('jsonwebtoken');
let userInfo = {
  name: 'hello',
  id: '123'
};
const secret = "hello";
const token = jwt.sign(
  userInfo,
  secret,
  {expiresIn: 5}
);

console.log('token', token);
let result = jwt.verify(
  token,
  secret,
);

console.log(new Date().toLocaleString(), '\t', result);

setInterval(() => {
  try {
    let result2 = jwt.verify(
      token,
      secret,
    );

    console.log(new Date().toLocaleString(), '\t', result2);

  } catch (e) {
    console.log(e);
  }

}, 1000);
