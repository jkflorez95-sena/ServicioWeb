# Servicio Web - Registro e Inicio de Sesión

Este proyecto lo desarrollé como parte de la evidencia **GA7-220501096-AA5-EV01**, donde construyo un servicio web que permite registrar usuarios y realizar autenticación mediante usuario y contraseña.  
Para la implementación utilicé **Node.js**, **Express**, **SQLite** y **bcrypt** para manejar la encriptación de las contraseñas.

---

## 1. Descripción del servicio web

Creé una API que cuenta con dos funcionalidades principales:

### ✔ Registro de usuarios  
El servicio recibe un usuario y una contraseña.  
- La contraseña la encripto antes de guardarla en la base de datos para mayor seguridad.  
- Si el registro es exitoso, devuelvo un mensaje confirmando la creación del usuario.

### ✔ Inicio de sesión  
- Recibo nuevamente usuario y contraseña.  
- Verifico que el usuario exista en la base de datos.  
- Comparo la contraseña ingresada con la encriptada.  
- Si todo es correcto, envío un mensaje indicando autenticación satisfactoria.  
- Si algo falla, retorno un error de autenticación.

---

## 2. Tecnologías utilizadas

- Node.js  
- Express  
- SQLite3  
- Bcrypt (para encriptación de contraseñas)  
- Git y GitHub como herramientas de versionamiento  

---

## 3. Instalación del proyecto

Para ejecutar mi proyecto localmente sigo estos pasos:

### **1️⃣ Instalar dependencias**

```bash
npm install
