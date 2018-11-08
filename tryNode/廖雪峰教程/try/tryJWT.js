const jwt = require('jsonwebtoken');
let userInfo = {
    name:'hello',
    id:'123'
};
const serect = "hello";
const token = jwt.sign(
    userInfo,
    serect,
    { expiresIn: 5 }
    );

console.log('token',token);
let result = jwt.verify(
    token,
    serect,
);

console.log(new Date().toLocaleString(),'\t',result);

setInterval(()=>{
    try {
        let result2 = jwt.verify(
            token,
            serect,
        );

        console.log(new Date().toLocaleString(),'\t',result2);

    }catch (e) {
        console.log(e);
    }

},1000);
