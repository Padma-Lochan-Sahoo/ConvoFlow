<div align="center">
  <h1>💬 ConvoFlow</h1>
  <p><strong>A production-grade real-time chat application built with the MERN stack + Socket.IO</strong></p>
</div>

---

## 🌐 Live Demo

> **[https://convoflow-eight.vercel.app/](https://convoflow-eight.vercel.app/)**

- **Frontend** — Deployed on [Vercel](https://vercel.com)
- **Backend API** — Deployed on [Render](https://render.com)
- **Database** — MongoDB Atlas (cloud-hosted)
- **Media Storage** — Cloudinary CDN

---

## 📌 Overview

ConvoFlow is a full-stack real-time chat application featuring:
- Email-based OTP authentication with JWT sessions
- Instant messaging with Socket.IO
- Online/offline presence indicators
- Typing indicators
- Image sharing via Cloudinary
- 30+ UI themes (DaisyUI)
- Fully responsive (mobile, tablet, desktop)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 OTP Signup | Email-verified registration via nodemailer |
| ⚡ Real-time Messaging | Bidirectional via Socket.IO rooms |
| 🟢 Online Presence | Live user online/offline status |
| ✏️ Typing Indicators | Real-time "is typing" feedback |
| 🖼️ Image Upload | Attach and share images (Cloudinary CDN) |
| 🎨 30+ Themes | DaisyUI theme switcher (dark, light, etc.) |
| 📱 Mobile-first | Responsive sidebar + mobile chat view |
| 🔒 Secure | JWT httpOnly cookies, helmet, bcrypt |
| 🚀 Deployed | Live on Vercel + Render |

---

## 🛠 Tech Stack

### Frontend
- **React 19** — UI framework
- **Vite 6** — Build tool
- **Zustand 5** — State management
- **Tailwind CSS 3** + **DaisyUI 4** — Styling & themes
- **Socket.IO Client 4.8** — Real-time communication
- **Framer Motion** — Animations
- **Axios** — HTTP client
- **React Router 7** — Routing
- **Lucide React** — Icons

### Backend
- **Express 5** — HTTP server
- **MongoDB** + **Mongoose 8** — Database & ODM
- **Socket.IO 4.8** — WebSocket server
- **JSON Web Tokens** — Authentication
- **bcryptjs** — Password hashing
- **Cloudinary** — Image storage
- **Nodemailer** — OTP email delivery
- **Helmet** — Security headers
- **CORS** — Cross-origin resource sharing

---

## 📁 Project Structure

```
ConvoFlow/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Route handler logic
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js  # JWT protectRoute
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── message.model.js
│   │   │   └── otp.model.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   ├── lib/
│   │   │   ├── db.js           # MongoDB connection
│   │   │   ├── socket.js       # Socket.IO server setup
│   │   │   ├── cloudinary.js   # Cloudinary config
│   │   │   └── utils.js        # JWT, OTP, email helpers
│   │   └── index.js            # App entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── skeletons/
    │   │   │   ├── MessageSkeleton.jsx
    │   │   │   └── SidebarSkeleton.jsx
    │   │   ├── AuthImagePattern.jsx
    │   │   ├── ChatContainer.jsx
    │   │   ├── ChatHeader.jsx
    │   │   ├── MessageInput.jsx
    │   │   ├── NavBar.jsx
    │   │   ├── NoChatSelected.jsx
    │   │   ├── OTPInput.jsx
    │   │   └── Sidebar.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── LogInPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   ├── SettingsPage.jsx
    │   │   ├── SignUpPage.jsx
    │   │   └── NotFoundPage.jsx
    │   ├── store/
    │   │   ├── useAuthStore.js  # Auth + socket state
    │   │   ├── useChatStore.jsx # Chat state
    │   │   └── useThemeStore.js # Theme persistence
    │   ├── lib/
    │   │   ├── axios.js         # Axios instance
    │   │   └── utils.js         # Date helpers
    │   └── constants/
    │       └── index.js         # Theme list, etc.
    ├── .env.example
    └── package.json
```

---

## ⚙️ Environment Setup

### Backend — `backend/.env`

```env
PORT=5001
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/convoflow
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **Gmail App Password**: Go to Google Account → Security → 2FA → App passwords → Generate

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
VITE_APP_NAME=ConvoFlow
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Gmail account with App Password enabled

### 1. Clone & install

```bash
git clone https://github.com/your-username/convoflow.git
cd convoflow

# Backend
cd backend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev

# Frontend (new terminal)
cd ../frontend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

### 2. Visit

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **Health check**: http://localhost:5001/api/health

---

## 🌐 Production Deployment

### Backend → Render

1. Push backend folder to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add all environment variables from `.env.example`
6. Set `NODE_ENV=production` and `CLIENT_URL=https://convoflow-eight.vercel.app`

### Frontend → Vercel

1. Push frontend folder to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set framework: **Vite**
4. Add environment variables:
   - `VITE_API_URL=https://your-backend.onrender.com/api`
   - `VITE_SOCKET_URL=https://your-backend.onrender.com`

---

## 🔌 Socket.IO Architecture

```
Client                         Server
  |                              |
  |-- connect (userId query) --> |
  |                              |-- userSocketMap[userId] = socketId
  |                              |-- emit("getOnlineUsers", [...])
  |                              |
  |-- emit("typing", {...}) ---> |
  |                              |-- emit("userTyping") to receiver
  |                              |
  |<-- emit("newMessage") ------|  (on REST POST /message/send/:id)
  |                              |
  |-- disconnect ------------->  |
                                 |-- remove from userSocketMap
                                 |-- emit("getOnlineUsers", [...])
```

---

## 📡 API Routes

### Auth — `/api/auth`

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/signup` | ❌ | Send OTP to email |
| POST | `/verify-otp` | ❌ | Verify OTP & create account |
| POST | `/login` | ❌ | Login & receive JWT cookie |
| POST | `/logout` | ❌ | Clear JWT cookie |
| POST | `/update-profile` | ✅ | Update name, bio, avatar |
| GET | `/check` | ✅ | Get authenticated user data |

### Messages — `/api/message`

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/users` | ✅ | Get all users (for sidebar) |
| GET | `/:id` | ✅ | Get messages with a user |
| POST | `/send/:id` | ✅ | Send a message (text/image) |

---

## 🔒 Security Features

- JWT stored in `httpOnly` cookies (not localStorage)
- `sameSite: none` in production for cross-origin cookies
- Password hashing with `bcryptjs` (salt rounds: 12)
- Security headers via `helmet`
- CORS allowlist-based origin validation
- OTP expiry (10 minutes) with cleanup
- Image upload size limit (10MB API / 5MB client)

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| Loading spinner stuck | Check `VITE_API_URL` is set correctly in `.env` |
| CORS errors | Ensure `CLIENT_URL` in backend `.env` matches your frontend URL exactly |
| Emails not sending | Use Gmail App Password, not your regular password |
| Socket not connecting | Verify `VITE_SOCKET_URL` points to your backend |
| Images not uploading | Check Cloudinary credentials in backend `.env` |
| MongoDB connection fail | Whitelist your IP in MongoDB Atlas Network Access |
| Cookie not set in production | Ensure backend uses `sameSite: none, secure: true` and frontend sends `withCredentials: true` |
| Render cold start delay | Free tier Render services sleep after inactivity — first request may take ~30s to wake up |

---

## 🔮 Future Improvements

- [ ] Group chats / channels
- [ ] Message reactions (emoji)
- [ ] Read receipts (double-tick)
- [ ] Push notifications (web-push)
- [ ] Message search
- [ ] Voice / video calls (WebRTC)
- [ ] File attachments (PDF, docs)
- [ ] Message deletion / editing
- [ ] Admin dashboard
- [ ] Rate limiting per user

---

## 📄 License

ISC License — see [LICENSE](./LICENSE) for details.

---

## 👤 Author

Built with ❤️ using the MERN stack + Socket.IO.

> **ConvoFlow** — Real-time conversations, beautifully designed.
> 🔗 **[convoflow-eight.vercel.app](https://convoflow-eight.vercel.app/)**