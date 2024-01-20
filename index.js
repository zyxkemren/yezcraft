const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.use(bodyParser.json());

// Menangani permintaan POST ke /webhook/trakteer
app.post('/webhook/trakteer', (req, res) => {
  console.log('Received POST request to /webhook/trakteer');
  console.log('Request Body:', req.body);
  res.status(200).send({ status: 'Success' });
});

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
