// En este archivo yo creo el servidor web usando Express.
// Aquí programo las rutas para registrar usuarios y para iniciar sesión.

const express = require("express");
const bcrypt = require("bcryptjs"); // Yo uso bcrypt para encriptar las contraseñas
const db = require("./db"); // Aquí importo la base de datos que configuré
const app = express();

// Con este middleware puedo recibir JSON desde el cliente.
app.use(express.json());

// -----------------------------
// RUTA PARA REGISTRAR USUARIO
// -----------------------------
app.post("/register", (req, res) => {
  // Yo recibo el usuario y la contraseña que me envía el cliente
  const { username, password } = req.body;

  // Verifico que ambos campos existan
  if (!username || !password) {
    return res.status(400).json({ message: "Debo enviar usuario y contraseña" });
  }

  // Yo hago el hash de la contraseña para que quede segura
  const passwordHash = bcrypt.hashSync(password, 10);

  // Inserto el usuario en la base de datos
  const sql = "INSERT INTO users (username, password_hash) VALUES (?, ?)";
  db.run(sql, [username, passwordHash], function (err) {
    if (err) {
      console.error("Error al registrar usuario:", err.message);
      return res.status(500).json({ message: "Error: el usuario ya existe" });
    }

    // Si todo sale bien
    res.json({ message: "Usuario registrado correctamente" });
  });
});

// -----------------------------
// RUTA PARA INICIAR SESIÓN
// -----------------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Reviso que tenga usuario y contraseña
  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  // Busco en la base de datos el usuario ingresado
  const sql = "SELECT * FROM users WHERE username = ?";
  db.get(sql, [username], (err, user) => {
    if (err) {
      console.error("Error al consultar usuario:", err.message);
      return res.status(500).json({ message: "Error interno" });
    }

    // Si el usuario no existe
    if (!user) {
      return res.status(401).json({ message: "Error en la autenticación" });
    }

    // Yo comparo la contraseña ingresada con la contraseña encriptada
    const passwordCorrect = bcrypt.compareSync(password, user.password_hash);

    if (!passwordCorrect) {
      return res.status(401).json({ message: "Error en la autenticación" });
    }

    // Si todo está bien
    res.json({ message: "Autenticación satisfactoria" });
  });
});

// -----------------------------
// INICIO DEL SERVIDOR
// -----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
