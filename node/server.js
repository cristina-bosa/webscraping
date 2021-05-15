var fs = require('fs');
var express = require('express');
var app = express();
var cors = require('cors');

const port = 3000;

app.use(cors());

app.get('/geox/shoes', (req, res) => {
  let readFile = fs.readFileSync('./shoesgeox.json');
  let file = JSON.parse(readFile);
  console.log(file);
  res.send(file);
});

//Inicio del server
app.listen(port, () => {
  console.log(`Running.. ${port}`);
});