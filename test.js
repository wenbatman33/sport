const puppeteer = require('puppeteer');
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://tixcraft.com/activity/detail/20_ERIC');
  await page.screenshot({path: 'google.png'});
  await page.click('a[target=_new]');

  //把網頁的body抓出來
  let body = await page.content()
  setTimeout(() => {
    getPage(body)
  }, 100);
  //cheerio去處理
  
  function getPage(html){
    const result = [];
    let $ = cheerio.load(html)
    // const concertDate = "2020/08/09";
    // const item = $('td:contains("' + concertDate + '")').parent();
    const item = $('.normal')
    item.map(item=>{
      console.log(item);
      const table_td = item.eq(i).find('td');
      const time = table_td.eq(1).text(); // time (台灣時間)
      const latitude = table_td.eq(2).text(); // latitude (緯度)
      const longitude = table_td.eq(3).text(); // longitude (經度)
      result.push(Object.assign({ time, latitude, longitude }));
    })
    // const btn = $(item).html();
    console.log(result);
  }
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