// db.js: Configuración y conexión a la base de datos SQLite.

const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './users.db'; 

// Configuración para abrir/crear la base de datos
const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Error al abrir la base de datos:", err.message);
        throw err;
    } else {
        console.log('Conexión exitosa a la base de datos SQLite.');
        
        // Crear la tabla 'users' si no existe. 
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`, (err) => {
            if (err) {
                console.error("Error al crear la tabla 'users':", err.message);
            } else {
                console.log("Tabla 'users' lista para el servicio web.");
            }
        });
    }
});

module.exports = db;