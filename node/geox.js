const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const url = "https://www.geox.com/es-ES/mujer/";
axios
    .get(url)
    .then(res => res.data)
    .then(body => {
        let $ = cheerio.load(body);
        const totalProducts = $('.category-list-results-count').text().substring(0, $('.category-list-results-count').text().indexOf(" "));
        const totalPages = Math.round(totalProducts / 24);
        const urls = [];

        for (let index = 1; index <= totalPages; index++) {
            urls.push(url + "?page=" + index);
        }

        let allProducts = [];
        const promises = urls.map((url, indice) =>
            getAllProducts(url, 2000 * indice)
        );
        Promise.all(promises).then((allResponses) => {
            allProducts = allResponses.flat();
            fs.writeFileSync("shoesgeox.json", JSON.stringify(allProducts));
        });

    });


function getAllProducts(url, delaySeconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            return axios
                .get(url)
                .then((res) => res.data)
                .then((body) => {
                    const $ = cheerio.load(body);
                    const divTitles = $('.product-details__text>a>.tile_product-name');
                    const divCategory = $('.product-details__text>a>.category');
                    const divPrices = $('.pdp-price .pdp-price__final');
                    const divImages = $('.product-image > .image-wrapper > img')
                    const divUrls = $('.product-details > .product-details__text > a')
                    
                    const products = [];

                    divTitles.each((index, element) => {
                        const model = $(element).text();
                        products.push({ model });
                        products[index].id = model.replace(" ","")+"-geox";
                        products[index].brand = "geox";
                    });

/*                     divCategory.each((index, element) => {
                        const model = $(element).text();
                        products[index].model = model;;
                    });
 */
                    divPrices.each((index, element) => {
                        const price = $(element).text().replace(/\n/g, "").replace("€", "");
                        products[index].price = parseFloat(price);
                    });

                    divImages.each((index, element) => {
                        const image = $(element).attr("src");
                        products[index].urlImg = image;
                    });

                    divUrls.each((index, element) => {
                        const url = $(element).attr("href");
                        products[index].hrefDetail = url;
                    });

                    resolve(products);
                });
        }, delaySeconds);
    });
}