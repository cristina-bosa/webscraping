const fs = require('fs');
const puppeteer = require('puppeteer');

const url = 'https://www.nike.com/es/w/zapatillas-3rauvz5e1x6znik1zy7ok';
let file = '../generatedHtml/nike.html';

(async () => {
  // Set up
  const browser = await puppeteer.launch({
		args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });
    
  console.log("Loading " + url);
  await page.goto(url);

	console.log("Scrolling to the bottom of the page..");
  await autoScroll(page);
    
  // Save extracted items to a file.
  const html = await page.content();
  console.log("Writing HTML to " + file);
  fs.writeFileSync(file, html);

  await browser.close();
})();

//Check why this is not loading well..
async function autoScroll(page){
	await page.evaluate(async () => { 
		await new Promise((resolve, reject) => {
			var totalHeight = 0;
			var distance = 100;
			var timer = setInterval(() => {
				var scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;

				if(totalHeight >= scrollHeight){
					clearInterval(timer);
					resolve();
				}
			}, 200); 
		});
	});
}