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
├── services/               # Lógica de negocio desacoplada de componentes
│   └── (helpers, transformaciones, utilidades reutilizables)
│
├── store/                  # Estados globales con Zustand
│   ├── useAuthStore.js     # Estado de autenticación y token JWT
│   ├── useGalleryStore.js  # Estado del contenido, filtros y selección
│   └── useFavoritesStore.js # Estado de favoritos del usuario
│
├── styles/                 # Estilos globales y por módulo
│   ├── GaleriaGrid.css     # Layout de grilla responsiva de la galería
│   ├── Global.css          # Reset y variables CSS globales
│   ├── Login.css           # Estilos del formulario de autenticación
│   ├── Modal.css           # Estilos de los modales (imagen y video)
│   ├── Navbar.css          # Estilos de la barra de navegación
│   └── Presentacion.css    # Estilos del modo presentación automática
│
├── App.css                 # Estilos raíz de la aplicación
├── App.jsx                 # ThemeProvider de MUI y punto de entrada
├── index.css               # Estilos base del HTML
└── index.js                # Punto de montaje de React en el DOM
```

---

## 🧩 Detalle de componentes del Frontend

### Atoms — Primitivos reutilizables

Los átomos son los bloques más pequeños de la interfaz. Están envueltos sobre MUI para centralizar la configuración visual (colores, tamaños, variantes) en un único lugar. Si en el futuro cambia el design system, solo se modifica el átomo, no cada componente que lo usa.

| Átomo | Descripción |
|-------|-------------|
| `Button` | Botón sobre `MUI Button` — define variantes propias (primario, icono, peligro) |
| `Input` | Campo de texto sobre `MUI TextField` — maneja estados de error y label |
| `Badge` | Etiqueta visual sobre `MUI Chip` — usada para mostrar categorías en las tarjetas |

### Components — Bloques funcionales

| Componente | Responsabilidad |
|-----------|-----------------|
| `MediaCard` | Tarjeta de galería. Muestra miniatura, tipo (imagen/video), badge de categoría, botón de favorito y checkbox de selección. Al hacer clic abre `ImageViewer` o `VideoViewer` según el tipo de contenido. |
| `ImageViewer` | Modal de visualización de imagen con zoom interactivo. Un clic activa el zoom, otro lo desactiva. Permite navegar entre items del contexto actual. |
| `VideoViewer` | Modal de reproducción de video. Usa el tag nativo `<video>` de HTML5 con `autoplay` y controles completos. |
| `Navbar` | Barra de navegación superior. Incluye links a categorías (Nature, Technology, Art), acceso a Favoritos, botón de Login/Logout y menú hamburguesa en resoluciones móviles. |

### Pages — Vistas completas

#### `GalleryPage.jsx`
Página principal de la aplicación. Se monta en la ruta `/` y en `/category/:category`. Se encarga de:
- Llamar a `fetchContent()` del store al montar para cargar los items desde el backend.
- Filtrar los items según la categoría activa en la URL o si se está en la vista de favoritos.
- Renderizar la grilla de `MediaCard` con los items filtrados.
- Exponer el botón para iniciar la presentación con los items seleccionados.

#### `LoginPage.jsx`
Formulario de autenticación montado en `/login`. Usa los átomos `Input` y `Button`. Al submit llama a `login()` del `useAuthStore`, que internamente hace el POST a `/api/auth/login`, guarda el JWT en `localStorage` y redirige al usuario a la galería.

#### `PresentationPage.jsx`
Modo de presentación automática montado en `/presentation` (ruta protegida). Cicla entre los items seleccionados o todos los de la galería si no hay selección. Permite configurar la duración de cada slide en segundos. Soporta navegación manual con las teclas ← y →, y salida con Escape.

### Services — Lógica desacoplada

La carpeta `services/` agrupa funciones puras y helpers que no pertenecen a un componente específico. Separan la lógica de negocio de la lógica de presentación, lo que facilita el testing y la reutilización.

### Styles — Hoja de estilos por módulo

Aunque el proyecto usa MUI como sistema de componentes principal, se mantienen archivos CSS dedicados para:

| Archivo | Qué controla |
|---------|-------------|
| `GaleriaGrid.css` | Layout responsivo de la grilla (columnas, gaps, breakpoints) |
| `Global.css` | Variables CSS, reset de estilos, tipografía base |
| `Login.css` | Centrado y estilos del card de login |
| `Modal.css` | Overlay, animación de apertura y cierre de modales |
| `Navbar.css` | Altura, z-index y comportamiento del menú hamburguesa |
| `Presentacion.css` | Pantalla completa, transiciones entre slides |

---

## 🔄 Flujo de datos del Frontend

### 1. Interceptor de Axios — JWT automático

Todos los llamados al backend pasan por `api/client.js`, que configura un interceptor de Axios:

```javascript
// api/client.js
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

Esto agrega el token JWT a cada petición sin repetir lógica en cada componente. Si el token no existe (usuario no autenticado), la cabecera simplemente no se incluye.

Los endpoints están separados por dominio:
- `auth.api.js` → `POST /api/auth/login`
- `content.api.js` → `GET /api/content`, `GET /api/content/:id`
- `favorites.api.js` → `GET /POST /DELETE /api/favorites`

### 2. Estado global con Zustand

En lugar de Context API o prop drilling, el estado global vive en stores de Zustand. Cada store es independiente y se importa directamente en cualquier componente:

```javascript
const { content, fetchContent } = useGalleryStore();
const { isAuthenticated, login, logout } = useAuthStore();
const { favorites, toggleFavorite } = useFavoritesStore();
```

**¿Por qué Zustand sobre Redux?**
- No requiere reducers, actions ni providers
- El store se define en una sola función
- Menos boilerplate, más legible para equipos pequeños
- Compatible con React DevTools

#### `useAuthStore`
Maneja el estado de sesión del usuario. Expone `isAuthenticated`, el objeto `user` y los métodos `login()` y `logout()`. Al hacer login, persiste el JWT en `localStorage`. Al hacer logout, limpia el estado y el token.

#### `useGalleryStore`
Centraliza el contenido de la galería. Almacena todos los items cargados desde el backend, el término de búsqueda activo y los items seleccionados para la presentación. Expone `fetchContent()` para cargar los datos y métodos para manejar la selección.

#### `useFavoritesStore`
Gestiona los favoritos del usuario autenticado. Se sincroniza con el backend al cargar y al hacer toggle. Si el usuario no está autenticado, las acciones de favoritos redirigen al login.

### 3. Rutas con React Router v7

```
AppRouter.jsx
├── /                     → GalleryPage (todos los items)
├── /category/:category   → GalleryPage (filtrado por categoría)
├── /favorites            → GalleryPage (filtrado por favoritos)
├── /login                → LoginPage
└── /presentation         → PresentationPage ✅ (ruta protegida)
```

La ruta `/presentation` está protegida con un componente `PrivateRoute` que verifica `isAuthenticated` del store. Si el usuario no está autenticado, redirige a `/login`.

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

## 📱 Diseño Responsivo

El layout se adapta a distintas resoluciones usando una combinación de CSS Grid, Flexbox y breakpoints de MUI:

| Resolución | Comportamiento |
|-----------|----------------|
| Mobile (< 600px) | 1 columna, menú hamburguesa, sin texto en botones |
| Tablet (600–960px) | 2 columnas, navbar compacta |
| Desktop (> 960px) | 3–4 columnas, navbar completa con links |

---

## 👨‍💻 Desarrollado por

**Edison Largo** — Desarrollador Full Stack  
Edisonlargo22@gmail.com