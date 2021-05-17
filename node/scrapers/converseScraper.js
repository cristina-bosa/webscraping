const puppeteer = require('puppeteer');
const fs = require('fs');

const converseUrl = 'https://www.converse.com/es/products/converse?lang=es_ES&pmid=AllOrderable-AllComingSoon-products-promotion&pmpt=PROMOTION_PRODUCT_TYPE_QUALIFYING&prefn1=CollectionMultiValue&prefv1=Classic%20Chuck&prefn2=gender&prefv2=Mujer%7CHombre%7CNi%C3%83%C2%83%C3%82%C2%B1os&prefn3=pillar&prefv3=Calzado&srule=most-popular&start=0&sz=16';

const converseScraper = (async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(converseUrl);

  //Cookies
  await page.click('button[class="button button--primary accept-button"]');

  //Scroll
  await autoScroll(page);

  const models = await page.evaluate(() => 
    Array.from(document
      .querySelectorAll('.name-link'))
      .map(element => element.innerText.trim())
  );
  const prices = await page.evaluate(() => 
    Array.from(document
      .querySelectorAll('.product-sales-price'))
      .map(element => element.innerText.trim())
  );
  const modelImg = await page.evaluate(() => 
    Array.from(document
      .querySelectorAll('.product-image img'))
      .map(element => element.getAttribute('src'))
  );
  const modelLink = await page.evaluate(() => 
    Array.from(document
      .querySelectorAll('.thumb-link'))
      .map(element => element.getAttribute('href'))
  );

  const output = [];

  for (let i = 0; i < models.length; i++) {
    output.push({
      id: model[i]+"-converse",
      brand: "Converse",
      model: models[i],
      price: prices[i],
      img: modelImg[i],
      link: modelLink[i],
      fav: false
    })
  }

  const converseOutput = JSON.stringify(output);
  fs.writeFile('../jsons/converse.json', converseOutput, (err, result) => {
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