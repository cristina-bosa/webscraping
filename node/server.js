var express = require('express');
var app = express();

const port = 3000;

app.get('/geox/shoes', (req, res) => {
  res.send('');
});

//Inicio del server
app.listen(port, () => {
  console.log(`Running.. ${port}`);
});