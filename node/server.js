const express = require('express');
const fs = require('fs')

let nikeElements = {};
let converseElements = {};

fs.readFile('./jsons/nike.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return
  }
  nikeElements = JSON.parse(jsonString);
})

fs.readFile('./jsons/converse.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return
  }
  converseElements = JSON.parse(jsonString);
})

const app = express();
const PORT = 3000;

//Ejecutar los scrapers para obtener los jsons

app.get('/nike/shoes', (req, res) => {; 
  res.json(nikeElements);
});
app.get('/converse/shoes', (req, res) => {; 
  res.json(converseElements);
});

app.listen(PORT, () => {
  console.log(`Running.. ${PORT}`);
});