const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");

var urlWeb = 'https://www.adidas.es/calzado';


axios.get(urlWeb).then(response => response.data).then(body => {
    var $ = cheerio.load(body)

    const numElements = +$('.count___1ZIhY').text().slice(1, $('.count___1ZIhY').text().length-1);
    const numElementsByPage = $('a.gl-product-card__details-link').length;
    const numPages = Math.round(numElements / numElementsByPage);
    
    // console.log(numElements);
    // console.log(numElementsByPage);
    // console.log(numPages);
    
    const urls = [];
    for (let index = 0; index <= numElements; index+= 5){
        urls.push(`https://www.adidas.es/calzado?start=${index}`);
        // console.log(index);
    }
    
    let products = [];
    const promises = urls.map((url, indice) => getProductFromPage(url, 2000*(indice)));
    Promise.all(promises)
        .then(allResponses => {
            console.log({allResponses})
            products = allResponses.flat();
            console.log("final:");
            console.log(products.length);
            fs.writeFileSync('products.json', JSON.stringify(products));
      })
});

function getProductFromPage(url, delaySeconds){
    return new Promise (resolve => {
        setTimeout(()=>{
            return axios.get(url).then(response => response.data).then(body => {

                var $ = cheerio.load(body)
                console.log(url);

                const spansTitles = $('span.gl-product-card__name');
                const titles = [];
                spansTitles.each((indice, span) => {
                    const title = $(span).text();
                    // console.log(title);
                    titles.push(title);
                });
                
                const imgImages = $('img.gl-product-card__image');
                const imgs = [];
                imgImages.each((indice, img) => {
                    const image = $(img).attr('src');
                    // console.log(image);
                    imgs.push(image);
                });
                
                const divsPrices = $('.gl-price-item');
                const prices = [];
                divsPrices.each((indice, div) => {
                    const price = $(div).text();
                    console.log(price);
                    prices.push(price);
                });
                const aHrefs = $('a.gl-product-card__details-link');
                const hrefs = [];
                aHrefs.each((indice, a) => {
                    const href = $(a).attr('href');
                    // console.log(href);
                    hrefs.push(href);
                    
                });

                const products = [];
                titles.forEach((title, idx) => {
                  products.push({
                    brand: "Adidas",
                    id: "",
                    model: title,
                    price: prices[idx],
                    urlImg: imgs[idx],
                    urlDetails: hrefs[idx],
                    fav: false
                  });
                });
                resolve(products);
            });
        }, delaySeconds);
    });
}