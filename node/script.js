var fs = require('fs');
var shoesService = require('./shoesService');

// obtener los ficheros de un directorio pasado por consola y recorrer cada uno
var filesDir = process.argv[2];
var files = fs.readdirSync(filesDir);
var shoesOnSales = [];

files.forEach(file => {
  let shoes = loadProductsFromFileJson(this + '/' + file); 
  shoes.forEach(updateOrCreateProduct);
}, filesDir);

/*Espera a que se añadan los calzados en oferta 
***mejorar ya que no se sabe cuanto tiempo hay que esperar*/
setTimeout(()=>{
  console.log("Calzados en oferta!");
  console.log(shoesOnSales);
}, 4000);


function updateOrCreateProduct(shoe){
    console.log(`comprobando producto con id ${shoe.id}`);
    return shoesService.getProductById(shoe.id).then(productOnDB => {
      if (!productOnDB){
        console.log(`adding Product: ${shoe.id}`);
        shoesService.addProduct(shoe)
        .then(response => {
          console.log("added");
        }).catch(err => {
          console.log(err);
        });
      }else{
        console.log(`updating Product: ${productOnDB.id}`);
        shoesService.updateProduct(shoe)
        .then(response => {
          console.log("updated");
          if (shoe.price < productOnDB.price){  // && (productOnDB.favorite == true)
            console.log(`en oferta!! ${shoe.id}`);
            shoe.oldPrice = productOnDB.price;
            shoesOnSales.push(shoe);
          }
        }).catch(err => {
          console.log(err);
        });
      }
    });
}

function loadProductsFromFileJson(filePath) {
    console.log(`Accediendo a ${filePath}`);
    let fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
}

