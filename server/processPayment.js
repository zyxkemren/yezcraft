const mysql = require("mysql");
const axios = require("axios");
const getUUID = require("./getUUID");
const getTime = require("./getTime");
require("dotenv").config();

// Konfigurasi koneksi MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const processPayment = async (req, res) => {
  const { supporter_name, quantity, price } = req.body;

  const timestamp = await getTime(7);

  const playerRegex = /^[a-zA-Z0-9_]{3,16}$/;

  let avatar = "https://cravatar.eu/avatar/steve/64.png";

  if (playerRegex.test(supporter_name)) avatar = `https://cravatar.eu/avatar/${supporter_name}/64.png`;

  const webhookUrl = "https://discord.com/api/webhooks/1218403223719772222/SfL-QSgbLLFE3eMAGK0AsVKjIJmSFHt9RtDROcHQdIfbeZCzBCW-tHsplIpU-Zy4t37e";

  const embedData = {
    embeds: [
      {
        title: `${supporter_name} berdonasi!`,
        description: `${msgData}\n\nhttps://store.anomaly.my.id/`,
        color: 0x2c2f33,
        footer: { text: timestamp.toString() },
        image: { url: banner },
        timestamp: new Date().toISOString(),
        thumbnail: {
          url: avatar,
          dynamic: true,
        },
      },
    ],
  };

  // Kirim pesan ke webhook Discord
  await axios
    .post(webhookUrl, embedData)
    .then((response) => {
      console.log(`Pesan berhasil dikirim ke Discord (${coins}) | (${quantity}) | (${price}) | (${supporter_name})`);
    })
    .catch((error) => {
      console.error("Gagal mengirim pesan ke Discord:", error);
    });

  // Query untuk menambahkan poin ke UUID tertentu
  const query = `UPDATE playerpoints_points SET points = points + ? WHERE uuid = ?`;

  const uuid = await getUUID(supporter_name);

  // Eksekusi query
  if (uuid != 1) {
    if (playerRegex.test(supporter_name)) {
      connection.query(query, [coins, uuid], (error, results) => {
        if (error) {
          console.error("Error adding points:", error);
          res.status(400).send(error);
        } else {
          console.log(`Successfully added ${coins} points to ${uuid} (${supporter_name})`);
          res.status(200).send("Successfull sent discord webhook and add points to player");
        }
      });
    }
  } else
    res
      .status(200)
      .send("Successfull sent discord webhook, but didn't added points to player. (Unknown UUID or Username)");
};

module.exports = { addPointsToUUID };
