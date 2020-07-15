const moment = require('moment');
const https = require('https');

module.exports = async function(sessionId, gameDate, gameTime, place) {
  try {
    await worker(sessionId, gameDate, gameTime, place);
    console.log('done');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function worker(sessionId, gameDate, gameTime, place) {
  const target = moment().add(1, 'day').startOf('day').add(1, 'millisecond');
  const now = moment();
  const msremain = target.toDate().getTime() - now.toDate().getTime();
  const url = `https://scr.cyc.org.tw/tp12.aspx?module=net_booking&files=booking_place&StepFlag=25&QPid=${place}&QTime=${gameTime}&PT=1&D=${gameDate}`;

  console.log(`Target url: ${url}`);
  console.log(`Start after ${Math.floor(msremain / 1000)} minutes. Execute at: ${moment(new Date().getTime() + msremain).format('dddd, MMMM Do YYYY, h:mm:ss a')}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('sending...');
      const req = https.request(url, {
        method: 'GET',
        headers: {
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-language': 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'cookie': `ASP.NET_SessionId=${sessionId}`
        }
      }, res => {
        console.log(`STATUS:  ${res.statusCode}`);
        res.setEncoding('utf8');
        res.on('data', c => {});
        res.on('end', resolve);
      });
      req.on('error', reject);
      req.end();
    }, msremain);
  });
}
