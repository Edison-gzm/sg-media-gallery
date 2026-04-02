# SG Media Gallery 🎨

Galería interactiva de imágenes y videos desarrollada como prueba técnica para **Transportadora San Gabriel**.

---

## 🚀 Tecnologías utilizadas

### Frontend *(foco principal)*
| Tecnología | Versión | Por qué se usó |
|-----------|---------|----------------|
| React.js | 19 | Librería principal para construir la UI con componentes reutilizables |
| React Router v7 | 7 | Manejo de rutas — cada categoría, login y presentación tiene su propia URL |
| Material UI (MUI) | 5 | Sistema de componentes y estilos — reemplaza CSS puro con `styled()` de MUI |
| Zustand | 4 | Manejo de estado global — reemplaza prop drilling y Context API |
| Axios | 1 | Cliente HTTP con interceptores para agregar JWT automáticamente |

### Backend *(capa de soporte)*
| Tecnología | Por qué se usó |
|-----------|----------------|
| Node.js + Express | API REST que expone los endpoints al frontend |
| PostgreSQL | Base de datos relacional con datos precargados automáticamente |
| Sequelize | ORM para interactuar con PostgreSQL desde Node.js |
| JWT | Autenticación stateless — el token viaja en cada petición |
| Docker + Docker Compose | Levanta los 3 servicios (frontend, backend, BD) con un solo comando |

---

## ⚙️ Requisitos previos

- Docker Desktop instalado y corriendo
- Git

---

## 📦 Cómo correr el proyecto
```bash
git clone https://github.com/Edison-gzm/sg-media-gallery.git
cd sg-media-gallery
docker-compose up --build
```

Esto levanta automáticamente los 3 servicios:

| Servicio | URL |
|---------|-----|
| 🎨 Frontend | http://localhost:3000 |
| ⚙️ Backend API | http://localhost:4000 |
| 🗄️ PostgreSQL | Puerto 5432 |

La base de datos se llena automáticamente con 9 items de prueba al primer arranque gracias al archivo `database/init.sql`.

**Credenciales de prueba:**
```
Email:    usuario@sg.com
Password: 1234
```

---

## ✨ Funcionalidades

- 📁 Navegación entre categorías con rutas dedicadas (`/category/Nature`, `/category/Technology`, `/category/Art`)
- 🔍 Clic en cualquier item abre una vista detallada en modal
- 🔎 Zoom interactivo en imágenes — clic para acercar, clic de nuevo para alejar
- ▶️ Reproductor de video nativo HTML5 con autoplay
- 🎬 Modo presentación automática con duración configurable en segundos
- ✅ Selección de items específicos para presentación personalizada
- ⌨️ Navegación con teclado en presentación (← → Escape)
- 🔐 Autenticación con JWT — token guardado en localStorage
- ⭐ Sistema de favoritos (solo usuarios autenticados)
- 📱 Diseño completamente responsivo con menú hamburguesa en móvil
- 🎞️ Animaciones y transiciones suaves

---

## 🗂️ Arquitectura del Frontend

La estructura de carpetas sigue el patrón **Atomic Design** adaptado:
```
frontend/src/
│
├── atoms/                  # Componentes primitivos reutilizables
│   ├── Button/             # Botón envuelto sobre MUI Button
│   ├── Input/              # Input envuelto sobre MUI TextField
│   └── Badge/              # Badge envuelto sobre MUI Chip
│
├── components/             # Componentes genéricos de la app
│   ├── ImageViewer/        # Modal de imagen con zoom interactivo
│   ├── VideoViewer/        # Modal de video con autoplay
│   ├── MediaCard/          # Tarjeta de galería con selección y favoritos
│   └── Navbar/             # Navegación con categorías y menú hamburguesa
│
├── pages/                  # Páginas completas de la aplicación
│   ├── auth/
│   │   └── LoginPage.jsx   # Página de login en /login
│   └── gallery/
│       ├── GalleryPage.jsx       # Galería principal en / y /category/:category
│       └── PresentationPage.jsx  # Presentación automática en /presentation
│
├── api/                    # Capa de comunicación con el backend
│   ├── client.js           # Instancia de Axios con interceptor JWT
│   ├── auth.api.js         # Endpoint de login
│   ├── content.api.js      # Endpoints de contenido
│   └── favorites.api.js    # Endpoints de favoritos
│
├── router/
│   └── AppRouter.jsx       # Definición de rutas con React Router
│
├── store/                  # Estados globales con Zustand
│   ├── useAuthStore.js     # Estado de autenticación
│   ├── useGalleryStore.js  # Estado del contenido y selección
│   └── useFavoritesStore.js # Estado de favoritos
│
└── App.jsx                 # ThemeProvider de MUI y punto de entrada
```

---

## 🔄 Cómo funciona el flujo de datos

### 1. Llamada a endpoints
Todos los llamados al backend pasan por `api/client.js` que tiene un interceptor de Axios:
```javascript
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

Esto hace que el token JWT se agregue automáticamente a cada petición sin tener que hacerlo manualmente en cada componente.

Los endpoints están separados por dominio:
- `auth.api.js` → `POST /api/auth/login`
- `content.api.js` → `GET /api/content`, `GET /api/content/:id`
- `favorites.api.js` → `GET/POST/DELETE /api/favorites`

### 2. Estado global con Zustand
En lugar de usar Context API o prop drilling, el estado global vive en stores de Zustand:
```javascript
// Ejemplo: cualquier componente accede al estado así
const { content, fetchContent } = useGalleryStore();
const { isAuthenticated } = useAuthStore();
const { toggleFavorite } = useFavoritesStore();
```

Zustand fue elegido sobre Redux por su simplicidad — no requiere reducers, actions ni providers. El store se define en una sola función y se consume directamente en cualquier componente.

### 3. Rutas
React Router maneja la navegación:

| Ruta | Componente | Protegida |
|------|-----------|-----------|
| `/` | GalleryPage | No |
| `/category/:category` | GalleryPage | No |
| `/favorites` | GalleryPage | No |
| `/login` | LoginPage | No |
| `/presentation` | PresentationPage | ✅ Sí |

---

## 🔌 Endpoints del API

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/content` | Lista todo el contenido | No |
| GET | `/api/content/:id` | Obtiene un item por ID | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/favorites` | Lista favoritos del usuario | ✅ |
| POST | `/api/favorites` | Agregar a favoritos | ✅ |
| DELETE | `/api/favorites/:id` | Eliminar de favoritos | ✅ |

---

## 👨‍💻 Desarrollado por

**Edison Largo** — Desarrollador Full Stack
Edisonlargo22@gmail.com