const express = require("express");

const app = express();
const port = 3000;

const { processPayment } = require("./server/processPayment");

app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/topup", (req, res, next) => {
  const expectedToken = 'trhook-c93eQcNwDv2P3BQp8LwH6pHU'; 
  const webhookToken = req.headers['x-webhook-token'];

  if (webhookToken !== expectedToken) {
      return res.status(403).json({ error: 'Forbidden' });
  }

  processPayment(req, res, next);
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});