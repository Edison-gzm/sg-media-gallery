# SG Media Gallery 🎨

Interactive media gallery developed as a technical test for **Transportadora San Gabriel**.

---

## 🚀 Tech Stack

**Frontend** *(main focus)*
- React.js + React Router v7
- Material UI (MUI) — component library and theming
- Zustand — global state management
- Axios — HTTP client

**Backend** *(supporting layer)*
- Node.js + Express + JWT authentication
- PostgreSQL + Sequelize ORM
- Docker + Docker Compose

---

## ⚙️ Requirements

- Docker Desktop
- Git

---

## 📦 Getting Started
```bash
git clone https://github.com/Edison-gzm/sg-media-gallery.git
cd sg-media-gallery
docker-compose up --build
```

| Service | URL |
|---------|-----|
| 🎨 Frontend | http://localhost:3000 |
| ⚙️ Backend API | http://localhost:4000 |

The database seeds automatically on first run.

**Test credentials:**
```
Email:    usuario@sg.com
Password: 1234
```

---

## ✨ Features

- 📁 Browse content by category (Nature, Technology, Art)
- 🔍 Click any item to open a detailed modal view
- 🔎 Interactive zoom on images
- ▶️ Auto-play video player (HTML5 native)
- 🎬 Presentation mode — auto-plays content sequentially
- ✅ Select specific items for a custom presentation
- ⌨️ Keyboard navigation (← → Escape)
- 🔐 JWT authentication
- ⭐ Favorites system (authenticated users only)
- 📱 Fully responsive design
- 🎞️ Smooth transitions and animations

---

## 🗂️ Frontend Architecture
```
frontend/src/
├── atoms/                  # Reusable UI primitives (Button, Input, Badge)
├── components/             # Generic components
│   ├── ImageViewer/        # Image modal with zoom
│   ├── VideoViewer/        # Video modal with autoplay
│   ├── MediaCard/          # Gallery card with selection
│   └── Navbar/             # Navigation with category routing
├── pages/
│   ├── auth/
│   │   └── LoginPage.jsx
│   └── gallery/
│       ├── GalleryPage.jsx
│       └── PresentationPage.jsx
├── api/                    # Backend communication layer
│   ├── client.js           # Axios instance with JWT interceptor
│   ├── auth.api.js
│   ├── content.api.js
│   └── favorites.api.js
├── router/
│   └── AppRouter.jsx       # Route definitions
├── states/                 # Zustand global stores
│   ├── useAuthStore.js
│   ├── useGalleryStore.js
│   └── useFavoritesStore.js
└── App.jsx                 # MUI theme provider
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/content` | List all content | No |
| GET | `/api/content/:id` | Get single item | No |
| POST | `/api/auth/login` | Sign in | No |
| GET | `/api/favorites` | List favorites | ✅ |
| POST | `/api/favorites` | Add favorite | ✅ |
| DELETE | `/api/favorites/:id` | Remove favorite | ✅ |

---

## 👨‍💻 Developer

**Edison Largo** — Full Stack Developer
Edisonlargo22@gmail.com