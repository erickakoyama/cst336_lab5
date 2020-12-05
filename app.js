require('dotenv').config(); // process.env variables

const express = require('express');
const app = express();
const fetch = require('node-fetch');
const pool = require('./dbPool.js');

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
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=ZHgmuOowRNnzY-nwFEKK1xBCqeOD9H_bfNpAXnnlUvI&featured=true&orientation=landscape&count=9&query=${keyword}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  const bgImage = data[0].urls.small;
  const imageUrlArray = data.map(imgObject => imgObject.urls.small);

  res.render('results', { imageUrl: bgImage, imageUrlArray });
});

app.get("/api/updateFavorites", function(req, res) {
  let sql;
  let sqlParams;
  switch (req.query.action) {
    case "add":
      sql = "INSERT INTO favorites (imageUrl, keyword) VALUES (?,?)";
      sqlParams = [req.query.imageUrl, req.query.keyword];
      break;
    case "delete":
      sql = "DELETE FROM favorites WHERE imageUrl = ?";
      sqlParams = [req.query.imageUrl];
      break;
  } //switch
  pool.query(sql, sqlParams, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.send(rows.affectedRows.toString());
  });

}); //api/updateFavorites

app.get("/getKeywords", function(req, res) {
  let sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";
  let imageUrl = ["img/favorite.png"];
  pool.query(sql, function(err, rows, fields) {
    if (err) throw err;
    res.render("favorites", { "imageUrl": imageUrl, "rows": rows });
  });
}); //getKeywords

app.get("/api/getFavorites", function(req, res) {
  let sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
  let sqlParams = [req.query.keyword];
  pool.query(sql, sqlParams, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });

}); //api/getFavorites




// starting server
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Express server is running...');
});
