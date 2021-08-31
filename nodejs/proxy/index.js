// 使用代理访问，之前尝试使用 axios，但是似乎axios在使用代理时会有问题

const request = require('request');
const axios = require('axios').default;
const tunnel = require('tunnel');

const url = 'https://google.com';

const tunnelProxy = tunnel.httpsOverHttp({
  proxy: {
    host: '127.0.0.1',
    port: 1081,
  },
});

async function main() {
  try {
    const res1 = await axios(url, {
      proxy: false,
      httpsAgent: tunnelProxy,
      timeout: 5000,
    });

    console.log(res1.data);
  } catch (error) {
    console.error(error.message);
  }

  request(
    {
      url,
      timeout: 5000,
      proxy: 'http://127.0.0.1:1081',
    },
    (error, response, body) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(body);
    }
  );
}

main();
