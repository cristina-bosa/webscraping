var express = require('express');
var app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('hello world');
});

//Inicio del server
server.listen(port, () => {
  console.log(`Running.. ${port}`);
});