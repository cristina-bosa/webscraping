var fs = require('fs');
var express = require('express');
var app = express();
const port = 3000;

app.get('/geox/shoes', (req, res) => {
  let readFile = fs.readFileSync('shoesgeox.json');
  res.status(200).json(readFile);
});

//Inicio del server
app.listen(port, () => {
  console.log(`Running.. ${port}`);
});