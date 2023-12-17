const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname);

const app = express();
app.use(express.static(initial_path)); //
app.use(fileupload());

app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, 'index.html')); //
});

app.get('/shop', (req, res) => {
  res.sendFile(path.join(initial_path, 'buysell.html')); //
});

app.get('/lostFound', (req, res) => {
  res.sendFile(path.join(initial_path, 'lostfound.html')); //
});

// upload link
app.post('/upload', (req, res) => {
  let file = req.files.image;
  let date = new Date();
  // image name
  let imagename = `${date.getDate()}-${date.getTime()}-${file.name}`;
  // image upload path
  let path = 'uploads/' + imagename;

  // create upload
  file.mv(path, (err, result) => {
    if (err) {
      throw err;
    } else {
      // our image upload path
      res.json(`uploads/${imagename}`);
    }
  });
});

app.use((req, res) => {
  res.json('404');
});

app.listen('3000', () => {
  console.log('listening......');
});