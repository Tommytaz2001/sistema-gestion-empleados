
# Sistema de Gestión de Empleados y Sucursales

![GitHub repo size](https://img.shields.io/github/repo-size/Tommytaz2001/sistema-gestion-empleados)
![GitHub last commit](https://img.shields.io/github/last-commit/Tommytaz2001/sistema-gestion-empleados)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Sistema web completo para la gestión de empleados y sucursales, desarrollado con React para el frontend y Node.js con Express para el backend.

## 🚀 Características Principales
- **Gestión de Empleados**: CRUD completo para empleados.
- **Gestión de Sucursales**: Administración de las diferentes sedes de la empresa.
- **Asignaciones**: Vinculación de empleados a sucursales específicas.
- **Dashboard Interactivo**: Panel de control con visualizaciones y métricas clave.
- **Interfaz Moderna y Responsiva**: Experiencia de usuario fluida en todos los dispositivos.

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19**: Para construir la interfaz de usuario.
- **Material-UI (MUI) v7**: Componentes UI estilizados y personalizables.
- **React Router DOM v7**: Para la navegación y enrutamiento en la aplicación.
- **Axios**: Cliente HTTP para realizar peticiones a la API.
- **Web Vitals**: Para medir el rendimiento de la aplicación.

### Backend
- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express.js**: Framework web para construir la API RESTful.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **pg (node-postgres)**: Cliente PostgreSQL para Node.js.
- **CORS**: Para habilitar peticiones desde diferentes orígenes.
- **dotenv**: Para gestionar variables de entorno.

## 📋 Prerrequisitos
Antes de comenzar, asegúrate de tener instalado lo siguiente:
- [Node.js](https://nodejs.org/) (versión 16.x o superior recomendada)
- npm (usualmente viene con Node.js) o [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/download/) (Base de datos)
- [Git](https://git-scm.com/) (Control de versiones)

## 📦 Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1.  **Clonar el Repositorio**
    ```bash
    git clone https://github.com/Tommytaz2001/sistema-gestion-empleados.git
    cd sistema-gestion-empleados
    ```

2.  **Configurar el Backend**
    ```bash
    cd backend
    npm install
    ```
    Crea un archivo `.env` en la raíz de la carpeta `backend` (puedes copiar `backend/.env.example` si existe, o crearlo desde cero) con las siguientes variables:
    ```env
    PORT=5000 # O el puerto que prefieras para el backend
    DATABASE_URL=postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_BASE_DATOS
    # Ejemplo: DATABASE_URL=postgresql://postgres:admin@localhost:5432/gestion_empleados
    ```
    Luego, inicia el servidor backend:
    ```bash
    npm start
    ```
    O para desarrollo con recarga automática:
    ```bash
    npm run dev
    ```

3.  **Configurar el Frontend**
    ```bash
    cd ../frontend # Asegúrate de estar en la raíz del proyecto antes de entrar a frontend
    npm install
    ```
    Crea un archivo `.env` en la raíz de la carpeta `frontend` (puedes copiar `frontend/.env.example` si existe, o crearlo desde cero) con la siguiente variable:
    ```env
    REACT_APP_API_URL=http://localhost:5000 # La URL donde se ejecuta tu backend
    ```
    Luego, inicia la aplicación frontend:
    ```bash
    npm start
    ```

4.  **Configurar la Base de Datos PostgreSQL**
    - Asegúrate de que tu servidor PostgreSQL esté en ejecución.
    - Crea una base de datos (ej. `gestion_empleados`).
    - Conéctate a tu base de datos y ejecuta los scripts SQL necesarios para crear las tablas y estructuras. Estos scripts se encuentran generalmente en una carpeta como `backend/database` o `backend/sql`. (Ej. `psql -U TU_USUARIO -d NOMBRE_BASE_DATOS -a -f backend/database/schema.sql`)

## 🚦 Estructura del Proyecto
```
sistema-gestion-empleados/
├── backend/                # Código del servidor (Node.js/Express)
│   ├── node_modules/
│   ├── config/             # Configuraciones (ej. conexión a BD)
│   ├── controllers/        # Lógica de negocio para las rutas
│   ├── models/             # Modelos de datos (ej. para interactuar con PostgreSQL)
│   ├── routes/             # Definición de las rutas de la API
│   ├── server.js           # Punto de entrada del servidor backend
│   ├── package.json
│   └── .env.example        # Ejemplo de variables de entorno para el backend
│
└── frontend/               # Aplicación cliente (React)
    ├── node_modules/
    ├── public/             # Archivos estáticos (index.html, favicon, etc.)
    └── src/
        ├── assets/         # Imágenes, fuentes, etc.
        ├── components/     # Componentes React reutilizables
        ├── contexts/       # Context API para gestión de estado global (opcional)
        ├── hooks/          # Hooks personalizados (opcional)
        ├── pages/          # Componentes de página (vistas principales)
        ├── services/       # Lógica para interactuar con la API (ej. usando Axios)
        ├── styles/         # Estilos globales, temas MUI
        ├── utils/          # Funciones de utilidad
        ├── App.js          # Componente raíz de la aplicación
        ├── index.js        # Punto de entrada de la aplicación React
        └── reportWebVitals.js
    ├── package.json
    └── .env.example        # Ejemplo de variables de entorno para el frontend
├── .gitignore              # Archivos y carpetas a ignorar por Git
└── README.md               # Este archivo
```

## 📝 Uso de la Aplicación
Una vez que tanto el backend como el frontend estén en ejecución:
1.  Abre tu navegador web.
2.  Navega a `http://localhost:3000` (o el puerto donde se esté ejecutando tu frontend React).

## 📄 API Endpoints (Ejemplo)
El backend expone una API RESTful. Aquí algunos ejemplos de endpoints (consulta `backend/routes/` para la definición completa):
- `GET /api/empleados`: Obtiene todos los empleados.
- `POST /api/empleados`: Crea un nuevo empleado.
- `GET /api/sucursales`: Obtiene todas las sucursales.
*(Se recomienda generar documentación más detallada para la API, por ejemplo, usando Swagger/OpenAPI)*

## ☁️ Despliegue (Próximamente)
*(Instrucciones o consideraciones para desplegar la aplicación en producción, ej. Vercel, Netlify para frontend; Heroku, AWS para backend)*

## 🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas contribuir, por favor:
1.  Haz un fork del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3.  Realiza tus cambios y haz commit (`git commit -am 'Añade nueva característica'`).
4.  Sube tus cambios a la rama (`git push origin feature/nueva-caracteristica`).
5.  Abre un Pull Request.

## 📄 Licencia
Este proyecto está bajo la Licencia MIT.

## ✉️ Contacto
Tommy Steeven Apolinario Sánchez - [Tommytaz2001](https://github.com/Tommytaz2001)

Enlace del Proyecto: [https://github.com/Tommytaz2001/sistema-gestion-empleados](https://github.com/Tommytaz2001/sistema-gestion-empleados)
=======
# sistema-gestion-empleados
Sistema de gestión de empleados y sucursales con React y Node.js
>>>>>>> 1845525969507f9ebf4501834f0a4cee813a3519
