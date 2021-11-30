import * as https from 'https';
import * as querystring from 'querystring';
import md5 = require('md5');

export const translate = (word) => {
  console.log(word);
  const appId = '???'
  const appSecret = '???'
  const salt = Math.random()
  const sign = md5(appId+word+salt+appSecret)
  const queryString:string = querystring.stringify({
    q: word,
    from: 'en',
    to: 'zh',
    appid: appId,
    salt: salt,
    sign: sign
  });


  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + queryString,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};