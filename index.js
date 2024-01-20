const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Middleware untuk menyajikan file statis
app.use(express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Menangani permintaan POST ke /webhook/trakteer
app.post("/webhook/trakteer", (req, res) => {
  console.log("Received POST request to /webhook/trakteer");
  console.log("Request Body:", req.body);
  res.status(200).send({ status: "Success" });
});

app.use((req, res, next) => {
  res.status(404).send("404 not found !!!");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
