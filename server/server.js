const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3400;

app.use(express.static(publicPath));

app.use(bodyParser.json());
app.use('/api', apiRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});