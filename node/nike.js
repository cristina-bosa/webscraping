const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const PORT = 3000;

//Axios URL fetch
const nikeFetch = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(`An error occurred fetching ${url}`);
  }
}

//Cheerio scraper
const scrapNike = async () => {
  const NIKE_URL = 'https://www.nike.com/es/w/zapatillas-3rauvz5e1x6znik1zy7ok';
  const html = await nikeFetch(NIKE_URL);

  const selector = cheerio.load(html);

  const searchResults = selector('body')
    .find('div[class="product-card__body"] > figure');

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
  
  const productImg = selector
    .find('img[class="css-1fxh5tw product-card__hero-image"]')
    .attr('src')

  const productUrl = selector
    .find('a[class="product-card__img-link-overlay"]')
    .attr('href')

  return { model, price, productImg, productUrl }
};

app.get('/nike/shoes', async (req, res) => {
  const result = await scrapNike(); 
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Running.. ${PORT}`);
});