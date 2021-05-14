const cheerio = require('cheerio');
const fs = require('fs');

const brand = 'Nike';
var id = 'Unset';
var fav = false; 

//Cheerio scraper
const scrapNike = async () => {

  const selector = cheerio.load(fs.readFileSync('./generatedHtml/nike.html'));

  const searchResults = selector('body')
    .find('div[class="product-grid__items css-yj4gxb css-r6is66 css-zndamd css-1u4idlj"] > div');

  const deals = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      return extractProduct(elementSelector);
    })
    .get();

  return deals;
};

const extractProduct  = selector => {
  const model = selector
    .find('div[class="product-card__title"]')
    .text()
    .trim()
  
  const price = selector
    .find('div[class="product-price css-11s12ax is--current-price"]')
    .text()
    .trim()
  
  const urlImg = selector
    .find('img[class="css-1fxh5tw product-card__hero-image"]')
    .attr('src')

  const hrefDetail = selector
    .find('a[class="product-card__img-link-overlay"]')
    .attr('href')
  
  id = brand + model;

  return { id, brand, model, price, urlImg, hrefDetail, fav }
};

module.exports = scrapNike();