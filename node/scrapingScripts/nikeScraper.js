const puppeteer = require('puppeteer');
const fs = require('fs');

const nikeUrl = 'https://www.nike.com/es/w/zapatillas-3rauvz56wtbz5e1x6z5sj3yz5y0tkz8g3lnz8ujihza6d8hznik1zy7ok';

const nikeScraper =  (async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(nikeUrl);

  //Cookies
  await page.click('button[data-var="acceptBtn"]');

  //Scroll
  await autoScroll(page);

  const models = await page.evaluate(() => 
    Array.from(document
      .querySelectorAll('.product-card__title'))
      .map(element => element.innerText.trim())
  );
  const prices = await page.evaluate(() => 
    Array.from(document
      .querySelectorAll('.product-card__price'))
      .map(element => element.innerText.trim().replace("€", ""))
  );
  const modelImg = await page.evaluate(() => 
    Array.from(document
      .querySelectorAll('.product-card__hero-image'))
      .map(element => element.getAttribute('src'))
  );
  const modelLink = await page.evaluate(() => 
    Array.from(document
      .querySelectorAll('.product-card__link-overlay'))
      .map(element => element.getAttribute('href'))
  );

  const output = [];

  for (let i = 0; i < models.length; i++) {
    output.push({
      id: models[i].replace(/\s/g, "")+"-nike",
      brand: "Nike",
      model: models[i],
      price: parseFloat(prices[i]),
      urlImg: modelImg[i],
      hrefDetail: modelLink[i],
      favorite: false
    })
  }

  const nikeOutput = JSON.stringify(output);
  fs.writeFileSync('../productsScrapted/nike.json', nikeOutput, (err, result) => {
    if(err) {
      console.log('error', err);
    }   
  });

  await browser.close();
})();

async function autoScroll(page){
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if(totalHeight >= scrollHeight){
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}