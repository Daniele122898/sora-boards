const express = require('express');
const path = require('path');

const app = express();
const publicPath = __dirname;
const port = 3555;

app.use(express.static(publicPath));

/* app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
}); */

app.listen(port, () => {
  console.log('Server is up on ', port);
});