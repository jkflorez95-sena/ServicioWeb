// En este archivo yo configuro la base de datos SQLite donde voy a guardar los usuarios.
// También me aseguro de crear la tabla si aún no existe.

const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Aquí defino la ruta donde quiero guardar la base de datos.
const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "auth.db");

// Yo verifico si la carpeta /data existe. Si no existe, la creo.
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Yo creo la conexión a la base de datos.
// Si el archivo no existe, SQLite lo crea automáticamente.
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al abrir la base de datos:", err.message);
    throw err;
  }

  console.log("Base de datos SQLite creada o cargada correctamente.");

  // Aquí creo la tabla 'users' si aún no existe.
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password_hash TEXT
    )`,
    (err) => {
      if (err) {
        console.error("Error al crear la tabla users:", err.message);
      } else {
        console.log("Tabla 'users' verificada correctamente.");
      }
    }
  );
});

// Exporto la conexión para poder usarla en otros archivos.
module.exports = db;
