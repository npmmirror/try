const axios = require('axios');
axios.get('https://www.npmjs.com/package/axios')
    .then(response=>{
        console.log(1,response.data);
        return (response);
    })
    .then(response=>{
        console.log(2,response.data);
    })
    .catch(err=>{
        console.log(err);
    });
