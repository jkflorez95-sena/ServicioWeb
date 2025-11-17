# ServicioWeb - Autenticación con Express y SQLite

Este proyecto implementa un servicio web con registro e inicio de sesión utilizando **Node.js**, **Express**, **SQLite** y **bcrypt**.

---

## 🚀 Instalación

### 1. Clonar o descargar el proyecto
```bash
git clone <url-del-repositorio>
cd ServicioWeb
```

### 2. Instalar dependencias
```bash
npm install
```

---

## ▶️ Ejecución del servidor

### Modo normal:
```bash
npm start
```

### Modo desarrollo (con reinicio automático):
```bash
npm run dev
```

El servidor quedará disponible en:
```
http://localhost:3000
```

---

## 🗄️ Base de datos

El sistema usa **SQLite**.  
El archivo de la base de datos se genera automáticamente en:

```
/data/auth.db
```

### Tabla principal: `users`

| Campo         | Tipo                                |
|---------------|--------------------------------------|
| id            | INTEGER PRIMARY KEY AUTOINCREMENT    |
| username      | TEXT UNIQUE                          |
| password_hash | TEXT                                 |

---

## 🔐 Rutas de la API

### POST /register  
Registra un nuevo usuario.

#### Body (JSON)
```json
{
  "username": "usuario",
  "password": "clave123"
}
```

### Respuestas:
- **201** → Usuario creado correctamente  
- **400** → Faltan datos  
- **409** → Usuario ya existe  
- **500** → Error interno  

---

### POST /login  
Inicia sesión verificando usuario y contraseña.

#### Body (JSON)
```json
{
  "username": "usuario",
  "password": "clave123"
}
```

### Respuestas:
- **200** → Autenticación correcta  
- **400** → Faltan datos  
- **401** → Credenciales incorrectas  
- **500** → Error interno  

---

## 📁 Estructura del proyecto

```
ServicioWeb/
│── db.js
│── index.js
│── package.json
│── README.md
│── .gitignore
│── data/
```

---

## 📌 Autor

**Juan Carlos Flórez**  
Centro de Formación SENA

