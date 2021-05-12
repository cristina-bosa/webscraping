var express = require('express');
var app = express();

const port = 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

server.listen(port, () => {
  console.log(`El servidor se está ejecutando en ${port}`);
});