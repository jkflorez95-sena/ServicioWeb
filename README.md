# Servicio Web - Registro e Inicio de Sesión  
_Evidencia GA7-220501096-AA5-EV01 - Diseño y Desarrollo de Servicios Web_

Este proyecto implementa un servicio web básico con registro e inicio de sesión utilizando:

- Node.js  
- Express  
- SQLite  
- Bcrypt para encriptación de contraseñas  

---

## 🚀 Instalación y ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar el servidor

**Modo normal:**
```bash
npm start
```

**Modo desarrollo (con reinicio automático):**
```bash
npm run dev
```

El servidor estará disponible en:  
**http://localhost:3000**

---

## 🗄️ Base de datos

El sistema utiliza SQLite.  
La base de datos se genera automáticamente en la carpeta:

```
/data/auth.db
```

### Tabla principal: **users**

| Campo         | Tipo                                 |
|---------------|--------------------------------------|
| id            | INTEGER PRIMARY KEY AUTOINCREMENT    |
| username      | TEXT UNIQUE                          |
| password_hash | TEXT                                 |

---

## 🔐 Endpoints de la API

### POST /register  
Registra un nuevo usuario.

#### Body (JSON)
```json
{
  "username": "usuario",
  "password": "clave123"
}
```

#### Respuestas
- **201** → Usuario creado correctamente  
- **400** → Faltan datos  
- **409** → Usuario ya existe  
- **500** → Error interno  

---

### POST /login  
Autentica un usuario existente.

#### Body (JSON)
```json
{
  "username": "usuario",
  "password": "clave123"
}
```

#### Respuestas
- **200** → Autenticación satisfactoria  
- **400** → Faltan datos  
- **401** → Error en autenticación  
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
│── data/ (contiene la base de datos auth.db)
```

---

## 👨‍💻 Autor  
**Juan Carlos Flórez**  
Centro de Formación SENA
