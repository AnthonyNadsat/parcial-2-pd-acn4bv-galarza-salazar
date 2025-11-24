# 🪲 Informe del Proyecto: BugLog
### Parcial 2 — Plataformas de Desarrollo (ACN4BV)

**Repositorio:** https://github.com/AnthonyNadsat/parcial-2-pd-acn4bv-galarza-salazar

**Equipo:** Galarza Lukas & Salazar Anthony

**Descripción:**  Segundo parcial de Plataformas de Desarrollo — Escuela Da Vinci

---
# 📋 Descripción

BugLog es una aplicación que permite a los usuarios reportar y gestionar bugs encontrados en videojuegos.
A diferencia del primer parcial esta versión incorpora:

- Backend real con Express
- Persistencia mediante SQLite
- Arquitectura modular con controladores, rutas y middlewares
- CRUD completo
- Protección de rutas
- Frontend desarrollado con React y Vite
- Validaciones completas

El sistema presenta un formulario de carga, historial visual de reportes, edición, eliminación y seguridad básica.

---

# ✨ Características

- Reporte de bugs con validaciones
- Historial visual en tarjetas ordenadas por fecha
- Edición y eliminación (modo admin)
- Persistencia mediante SQLite
- CRUD completo conectado al frontend
- Rutas protegidas con middleware `authAdmin`
- Frontend en React con estado, hooks y componentes reutilizables
- Backend organizado en capas (routes, controllers, middlewares)
- Estilos responsivos y tema oscuro moderno
- Mensajes de error claros en tiempo real

---

# 🚀 Tecnologías Utilizadas

## **Frontend**
- React  
- Vite  
- React Router  
- CSS  
- Fetch API  

## **Backend**
- Node.js  
- Express  
- SQLite (better-sqlite3)  
- CORS  
- Middlewares personalizados  

## **Herramientas**
- Git & GitHub  
- Conventional Commits  

---

# 🛠 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/AnthonyNadsat/parcial-2-pd-acn4bv-galarza-salazar.git

```
## 2. Instalar dependencias del backend
```bash
cd backend
npm install express cors better-sqlite3
```

## 3. Instalar dependencias del frontend
```bash
cd frontend
npm install
```
## 4. Ejecutar backend
```bash
cd backend
npm start

El servidor corre en:
http://localhost:3000
```
## 5. Ejecutar frontend
```bash
cd frontend
npm run dev

La app corre en:
http://localhost:5173

```
## 📝 Uso de la Aplicación

### Reportar un bug
- Completar todos los campos del formulario
- Presionar “Reportar bug”
- El backend almacena el reporte en SQLite
- La UI se actualiza automáticamente
### Ver historial
- Mostrar todos los bugs reportados ordenados por fecha
- Cada tarjeta muestra:
-Juego
-Tipo
-Plataforma
-Gravedad
-Descripción
-Fecha
Cada tarjeta tiene botones para editar o eliminar en la vista de admin

## 🎨 Efectos Visuales

- Tema oscuro moderno
- Cards con sombras y bordes redondeados
- Inputs estilizados
- Placeholder y labels mejorados 

## 🏗️ Arquitectura del Proyecto

```bash

backend/
 ├── controllers/
 ├── routes/
 ├── middlewares/
 ├── data/
 ├── database.js
 └── index.js

frontend/
 ├── assets/
 ├── components/
 ├── pages/
 ├── context/
 ├── services/
 └── styles/

```

## 📱 Capturas de Pantalla
- Vista Login.
<img width="2548" height="1264" alt="loginBuglog" src="https://github.com/user-attachments/assets/b612464f-a913-495e-a32e-711384a07b75" />

- Vista Form.
  
<img width="2555" height="1272" alt="FormBugLog" src="https://github.com/user-attachments/assets/c706d07b-a4e7-4f42-a70a-ba623e9c8c7c" />

- Vista Report(Admin).

<img width="2559" height="1272" alt="ReportesBugLog" src="https://github.com/user-attachments/assets/6a27e225-fbef-4393-b25b-357b1b83fa81" />




## ✏️ Patrones aplicados
- Separación de responsabilidades
- Arquitectura modular
- CRUD completo
- Middlewares
- React Components
- Hooks (useState, useEffect, useContext)

## 🧾 Patrones de Commit Utilizados

- feat: nuevas funciones
- refactor: reorganización de código
- chore: mantenimiento

## 📝 Conclusiones

Logros destacados:
✔ Migración completa a backend real
✔ Integración de SQLite como base de datos
✔ Rutas protegidas con middleware
✔ CRUD funcional e integrado con el frontend
✔ Arquitectura modular clara
✔ Diseño visual mejorado
✔ Validaciones en frontend y backend
✔ Uso de React y Vite

<img width="51" height="54" alt="buglog" src="https://github.com/user-attachments/assets/23e4a8e4-c6fb-4890-af8c-4d3d92d696bf" />

