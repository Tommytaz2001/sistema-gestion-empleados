# Sistema de Gestión de Empleados y Sucursales

![GitHub repo size](https://img.shields.io/github/repo-size/Tommytaz2001/sistema-gestion-empleados)
![GitHub last commit](https://img.shields.io/github/last-commit/Tommytaz2001/sistema-gestion-empleados)

Sistema web completo para la gestión de empleados y sucursales, desarrollado con React para el frontend y Node.js con Express para el backend.

## 🚀 Características

- **Gestión de Empleados**: Registro, edición y eliminación de empleados.
- **Gestión de Sucursales**: Administración de diferentes sucursales de la empresa.
- **Asignaciones**: Asignación de empleados a diferentes sucursales.
- **Dashboard**: Panel de control con información relevante.
- **Interfaz Responsiva**: Diseño adaptativo para diferentes dispositivos.

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 19
- Material-UI (MUI) v7
- React Router DOM v7
- Axios para peticiones HTTP

### Backend
- Node.js
- Express.js
- PostgreSQL
- CORS para manejo de peticiones cruzadas
- dotenv para variables de entorno

## 📦 Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Tommytaz2001/sistema-gestion-empleados.git
   cd sistema-gestion-empleados
   ```

2. **Configurar el Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configurar las variables de entorno en .env
   npm start
   ```

3. **Configurar el Frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Configurar las variables de entorno en .env
   npm start
   ```

4. **Configurar la base de datos**
   - Crear una base de datos PostgreSQL
   - Ejecutar los scripts SQL necesarios (ver carpeta `backend/database`)

## 🚦 Estructura del Proyecto

```
sistema-gestion-empleados/
├── backend/               # Código del servidor
│   ├── config/           # Configuraciones
│   ├── controllers/      # Controladores
│   ├── models/           # Modelos de datos
│   ├── routes/           # Rutas de la API
│   ├── server.js         # Punto de entrada del servidor
│   └── package.json
│
└── frontend/            # Aplicación React
    ├── public/          # Archivos estáticos
    └── src/
        ├── components/  # Componentes reutilizables
        ├── pages/       # Componentes de página
        ├── App.js       # Componente principal
        └── index.js     # Punto de entrada de React
```

## 📝 Uso

1. Inicia el servidor backend:
   ```bash
   cd backend
   npm start
   ```

2. Inicia la aplicación frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Abre tu navegador en `http://localhost:3000`

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, lee las [pautas de contribución](CONTRIBUTING.md) antes de enviar cambios.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

## ✉️ Contacto

Tommy Apolinario - [@tu_usuario](https://github.com/Tommytaz2001)

Enlace del proyecto: [https://github.com/Tommytaz2001/sistema-gestion-empleados](https://github.com/Tommytaz2001/sistema-gestion-empleados)
