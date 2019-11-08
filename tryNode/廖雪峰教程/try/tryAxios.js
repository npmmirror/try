const axios = require('axios');
const appid = '';
const appserect = '';

const assert = require('assert');
var fs = require('fs');

function getOpenId(code) {
    return new Promise(
        function (reslove, reject) {
            axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appserect}&js_code=${code}&grant_type=authorization_code`)
                .then(response => {
                    console.log(1, response.data);
                    return (response);
                })
                .then(response => {
                    console.log(2, response.data);
                    reslove('001');
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });

        }
    )
}

function getOpenId2(code) {
    return (
        axios.get(`https://api.weixin.qq.c1om/sns/jscode2session?appid=${appid}&secret=${appserect}&js_code=${code}&grant_type=authorization_code`)
            .then(response => {
                if (response.data && response.data.openid) {
                    return response.data;
                }
                else {
                    throw response.data;
                }
            })
            .catch(function (err) {
                console.debug('ERROR:',err.code,err.codeNo);
                throw(err);
            })
    )
}

/**
 * @description 获取 openid 和 session_key
 * @param code
 * @returns {Promise}
 */
function wxLogin(code){
    return new Promise(function (reslove, reject) {
        axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appserect}&js_code=${code}&grant_type=authorization_code`)
            .then(response => {
                if (response.data && response.data.openid) {
                    reslove(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(function (err) {
                console.error('ERROR:',err);
                reject(err);
            })

    })
}

/*
正确返回
{
    session_key: '0/7ZDkix2//MLOO9sN4kpg==',
    openid: 'oRg9V43zuol1YSdP7LCrsqmqD9wg'
}
错误返回
{
    errcode: 40163,
    errmsg: 'code been used, hints: [ req_id: Dn_vpa09214122 ]'
}
{
    errcode: 40029,
    errmsg: 'invalid code, hints: [ req_id: _xoLQa0967hb30 ]'
}
 */


async function testCase() {
    let wxCode = "";
    try {
        let res = await getOpenId2(wxCode);
        console.log('res', res);
    } catch (e) {
        console.log('err', e)
    }
}

exports.wxLogin = wxLogin;
