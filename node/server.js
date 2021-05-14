const express = require('express');
const scraper = require('./scraper/nike');

const app = express();
const PORT = 3000;

app.get('/nike/shoes', async (req, res) => {
  const result = await scraper; 
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Running.. ${PORT}`);
});