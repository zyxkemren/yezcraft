const express = require("express");

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/perks", (req, res) => {
  res.sendFile(__dirname + "/perks/index.html");
})

app.post("/topup", (req, res, next) => {
  const expectedToken = 'trhook-NOxaHgZedQ1RQ2HUUqklBjEa'; 
  const webhookToken = req.headers['x-webhook-token'];

  if (webhookToken !== expectedToken) {
      return res.status(403).json({ error: 'Forbidden' });
  }

  addPointsToUUID(req, res, next);
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});