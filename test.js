const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://tixcraft.com/activity/detail/20_ERIC');
  console.log('object')
  await page.screenshot({path: 'google.png'});
  await page.click('a[target=_new]');

  //把網頁的body抓出來
  let body = await page.content()
  console.log(body)

  //接著我們把他丟給cheerio去處理
  // let $ = await cheerio.load(body)
  // const concertDate = "2020/08/09";
  // const item = $('td:contains("' + concertDate + '")').parent();
  // const btn = $(item).find($('input[value=立即訂購]'));
  // console.log(initBtn);

  // await browser.close();

})();




// const getPage = function () {
//   request({
//     url: "https://tixcraft.com/activity/detail/20_ERIC", // 中央氣象局網頁
//     method: "GET"
//   }, function (error, response, body) {
//     if (error || !body) {
//       return;
//     }
//     const $ = cheerio.load(body);
//     const initBtn = $('a[target=_new]');
//     // 
//     const concertDate = "2020/08/09";
//     const item = $('td:contains("' + concertDate + '")').parent();
//     const btn = $(item).find($('input[value=立即訂購]'));
//     console.log(initBtn);
//     // data-href
    
//   });
// };

// getPage();