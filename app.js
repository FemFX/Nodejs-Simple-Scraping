const needle = require('needle');
const cheerio = require('cheerio');

const fs = require('fs-extra');
const writeStream = fs.createWriteStream('text.csv');

const url = `https://play.aliexpress.com/groupShare/productDetail.htm?id=4000079561296&productId=4000079561296&spm=a2g01.11225407.wjdlffivo8lhucw.5.5d231af1WfoY7G&channel=groupshare&gps-id=5454145&scm=1007.16233.92932.0&scm_id=1007.16233.92932.0&scm-url=1007.16233.92932.0&pvid=57c188e8-9cb2-47e1-ba53-c40aec71a9fc`;

needle.get(url, (err, res) => {
  if (err) throw err;
  const $ = cheerio.load(res.body);
  const name = $('.product-name').text();
  writeStream.write(`Name : ${name}\n`);
  const img = $('.img-thumb-item img').attr('src');
  writeStream.write(`Img url : ${img}\n`);
  const price = $('#j-buy-now-total-price-value').text();
  writeStream.write(`Price : ${price.trim()}\n`);
});
