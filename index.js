// index.js: Archivo principal del servicio web.
// Este código maneja las rutas /register y /login, y utiliza bcrypt para la seguridad.

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db'); 

const app = express();
const PORT = 5000;

app.use(express.json());

// Ruta: Registro de usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Debo enviar usuario y contraseña" });
    }

    try {
        // Encriptar la contraseña (factor de coste 10)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        db.run(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword],
            function (err) {
                if (err) {
                    console.error("Error al registrar usuario:", err.message);
                    return res.status(400).json({ error: "El usuario ya existe o ocurrió un error al guardar" });
                }
                res.status(201).json({ message: "Usuario registrado correctamente", userId: this.lastID });
            }
        );

    } catch (error) {
        console.error("Error en el servidor durante el registro:", error);
        res.status(500).json({ error: "Hubo un error en el servidor" });
    }
});


// Ruta: Inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Debo enviar usuario y contraseña" });
    }

    // Buscar el usuario en la BD
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        
        // Error si no se encuentra el usuario o error de BD
        if (err || !user) {
            // Requisito de la evidencia: error en la autenticación.
            return res.status(401).json({ error: "Error de autenticación" });
        }

        try {
            // Comparar la contraseña proporcionada con el hash guardado
            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                // Contraseña incorrecta. Requisito de la evidencia.
                return res.status(401).json({ error: "Error de autenticación" });
            }

            // Autenticación exitosa: Requisito de la evidencia
            res.json({ message: "Autenticación satisfactoria" });

        } catch (compareError) {
            console.error("Error al comparar contraseñas:", compareError);
            res.status(500).json({ error: "Error interno al verificar la contraseña" });
        }
    });
});


// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor de servicio web corriendo en http://localhost:${PORT}`);
});