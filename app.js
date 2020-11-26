const express = require('express');
const app = express();
const fetch = require('node-fetch');

// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'));

// routes
app.get('/', async(req, res) => {
  const apiUrl = 'https://api.unsplash.com/photos/random/?client_id=ZHgmuOowRNnzY-nwFEKK1xBCqeOD9H_bfNpAXnnlUvI&featured=true';
  const response = await fetch(apiUrl);
  const data = await response.json();

  res.render('index', { imageUrl: data.urls.small });
});

app.get('/search', async(req, res) => {
  const keyword = req.query.keyword || '';
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=ZHgmuOowRNnzY-nwFEKK1xBCqeOD9H_bfNpAXnnlUvI&featured=true&orientation=landscape&query=${keyword}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  res.render('index', { imageUrl: data.urls.small });
});

// starting server
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Express server is running...');
});
