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
app.post("/webhook/trakteer", (req, res) => {
  console.log("Received POST request to /webhook/trakteer");
  console.log("Request Body:", req.body);
  res.status(200).send({ status: "Success" });
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});