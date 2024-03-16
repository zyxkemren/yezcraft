const mysql = require("mysql");
require("dotenv").config();

// Konfigurasi koneksi MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function getUUID(name) {
  return new Promise((resolve, reject) => {
    const query = `SELECT uuid FROM playerpoints_username_cache WHERE username = ?`;
    connection.query(query, [name], (error, results, fields) => {
      if (error) {
        console.error("Error saat melakukan query:", error);
        reject(error);
        return;
      }

      if (results.length > 0) {
        const uuid = results[0].uuid;
        resolve(uuid);
      } else {
        console.log(`Tidak ada data yang ditemukan untuk UUID ${name}`);
        resolve(1);
      }
    });
  });
}

module.exports = getUUID;
