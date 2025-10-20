# 🎵 Spotify Clone - Full Stack Music Streaming Platform

A full-featured music streaming application built with modern web technologies. Features include music playback, album management, real-time chat, and an admin dashboard for content management.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-15+-blue.svg)
![React](https://img.shields.io/badge/react-19.1.1-blue.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎵 Music Player
- Play, pause, skip, and shuffle songs
- Queue management with add/remove functionality
- Volume control and seek functionality
- Display current song with artist and album art
- Auto-play next song in queue

### 💿 Albums & Songs
- Browse all albums and songs
- View album details with track listings
- Featured songs section
- Trending songs
- Random song discovery

### 💬 Real-time Chat
- Send and receive messages in real-time
- Online/offline user status indicators
- Message history
- Socket.io powered instant messaging

### 👑 Admin Dashboard
- Upload songs with audio and cover art
- Create albums with metadata
- Delete songs and albums
- View platform statistics (songs, albums, users, artists)
- Protected admin routes

### 🔐 Authentication
- User registration with email verification
- Secure JWT-based authentication
- Email verification with 6-digit codes
- Password reset functionality
- Protected routes and middleware

### 📊 Platform Statistics
- Total songs, albums, users, and artists
- Real-time activity tracking
- Friends activity feed

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Socket.io** - Real-time messaging
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing
- **express-fileupload** - File uploads
- **node-cron** - Scheduled tasks

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management
- **React Router** - Navigation
- **Radix UI** - Component primitives
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time updates
- **Axios** - HTTP client
- **Framer Motion** - Animations

### Development & Testing
- **Nodemon** - Auto-reload
- **ESLint** - Code linting
- **curl** - API testing (45+ comprehensive tests)

## 📁 Project Structure

```
spotify/
├── backend/
│   ├── controllers/          # Request handlers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middleware/           # Auth & validation
│   ├── lib/                  # Utilities (socket, email, file storage)
│   ├── db/                   # Database connection & schema
│   ├── seeds/                # Database seed scripts
│   ├── tests/                # API tests (curl-based)
│   ├── uploads/              # Local file storage
│   ├── index.js              # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── layout/           # Layout components
│   │   ├── pages/            # Page components
│   │   ├── store/            # Zustand stores
│   │   ├── types/            # TypeScript types
│   │   ├── lib/              # Utilities
│   │   └── App.tsx           # Main app component
│   ├── public/
│   ├── index.html
│   └── package.json
├── TEST_OVERVIEW.md          # Testing guide
└── README.md                 # This file
```

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **PostgreSQL** (v15 or higher)
- **Git**

### Check Versions

```bash
node --version    # Should be >= 18.0.0
npm --version     # Should be >= 9.0.0
psql --version    # Should be >= 15
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd spotify
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE auth_db;
\q

# Run schema
psql -U postgres -d auth_db -f backend/db/schema.sql
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/auth_db

# Server
PORT=5001
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CLIENT_URL=http://localhost:3000

# Admin
ADMIN_EMAIL=your-admin@gmail.com
```

### Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this password in `SMTP_PASS`

### Frontend Configuration

Create a `.env` file in the `frontend/` directory (if needed):

```env
VITE_API_URL=http://localhost:5001
```

## 🎮 Running the Application

### Development Mode

#### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

Server will run on `http://localhost:5001`

#### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

App will run on `http://localhost:3000`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Production Server

```bash
cd backend
NODE_ENV=production npm start
```

## 🌱 Seed Database

### Option 1: Seed Songs Only

```bash
cd backend
npm run seed:songs
```

This creates 18 individual songs.

### Option 2: Seed Albums with Songs

```bash
cd backend
npm run seed:albums
```

This creates 4 albums with 14 songs organized by album.

**Note:** You need to place actual audio and image files in the `backend/uploads/` directory matching the seed data paths, or the app will display broken links. Files should be organized as:

```
backend/uploads/
├── audio/
│   ├── 1.mp3
│   ├── 2.mp3
│   └── ...
└── images/
    ├── 1.jpg
    ├── 2.jpg
    ├── album1.jpg
    └── ...
```

## 🧪 Testing

### Run All API Tests

```bash
cd backend
npm test
```

### Run Specific Test Suites

```bash
npm run test:auth      # Authentication tests
npm run test:songs     # Song endpoint tests
npm run test:albums    # Album endpoint tests
npm run test:admin     # Admin tests (file uploads)
npm run test:users     # Users & stats tests
```

### Test Coverage

- ✅ **45+ comprehensive tests**
- ✅ All endpoints covered
- ✅ Positive and negative test cases
- ✅ File upload testing
- ✅ Authentication flows

For detailed testing documentation, see [`TEST_OVERVIEW.md`](./TEST_OVERVIEW.md)

## 📚 API Documentation

### Base URL

```
http://localhost:5001/api
```

### Endpoints

#### Authentication
```
POST   /auth/signup              - Register new user
POST   /auth/login               - Login user
POST   /auth/logout              - Logout user
POST   /auth/verify-email        - Verify email with code
POST   /auth/forgot-password     - Request password reset
POST   /auth/reset-password/:token - Reset password
GET    /auth/check-auth          - Check authentication status
```

#### Songs
```
GET    /songs                    - Get all songs
GET    /songs/random             - Get random songs
GET    /songs/featured           - Get featured songs
GET    /songs/trending           - Get trending songs
GET    /songs/:id                - Get song by ID
```

#### Albums
```
GET    /albums                   - Get all albums
GET    /albums/:id               - Get album by ID with songs
```

#### Admin (Protected)
```
GET    /admin/check              - Check admin status
POST   /admin/songs              - Create song (multipart)
DELETE /admin/songs/:id          - Delete song
POST   /admin/albums             - Create album (multipart)
DELETE /admin/albums/:id         - Delete album
```

#### Users (Protected)
```
GET    /users                    - Get all users
GET    /users/messages/:userId   - Get messages with user
POST   /users/messages           - Send message
```

#### Statistics
```
GET    /stats                    - Get platform statistics
```

### Authentication

Most endpoints require authentication via JWT token stored in cookies:

```bash
# Login first
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' \
  -c cookies.txt

# Use token in subsequent requests
curl http://localhost:5001/api/songs \
  -b cookies.txt
```

For detailed API examples, run the test suite and review test scripts in `backend/tests/`

## 🎨 Screenshots

### Home Page
Music discovery with featured and trending songs

### Album View
Album details with track listings and playback controls

### Chat Page
Real-time messaging with online status indicators

### Admin Dashboard
Content management with upload capabilities and statistics

## 👥 User Roles

### Regular User
- Browse and play songs
- View albums
- Send/receive messages
- Manage playback queue

### Admin User
- All regular user permissions
- Upload songs and albums
- Delete content
- View platform statistics

**Note:** To make a user admin, update the `is_admin` column in the database:

```sql
UPDATE users SET is_admin = true WHERE email = 'admin@example.com';
```

Or set `ADMIN_EMAIL` in `.env` to automatically grant admin access to that email.

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Email verification required
- ✅ Protected routes and middleware
- ✅ CORS configuration
- ✅ Cookie-based token storage
- ✅ SQL injection prevention (parameterized queries)
- ✅ Rate limiting on sensitive endpoints

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
psql -U postgres

# Check connection string in .env
DATABASE_URL=postgresql://username:password@localhost:5432/auth_db
```

### Email Not Sending

- Verify SMTP credentials in `.env`
- Check Gmail app password (not regular password)
- Ensure 2FA is enabled on Google account

### File Upload Errors

- Check `backend/uploads/` directory exists and is writable
- Verify file size limits in `backend/index.js` (default: 10MB)

### Frontend Not Connecting to Backend

- Verify backend is running on port 5001
- Check CORS configuration in `backend/index.js`
- Ensure `CLIENT_URL` in `.env` matches frontend URL

### Socket.io Connection Issues

- Verify Socket.io server is initialized in `backend/index.js`
- Check Socket.io client connection in frontend
- Ensure same protocol (HTTP/HTTPS) is used

## 📈 Performance Optimizations

- **Database Indexing** - Indexes on frequently queried columns
- **File Streaming** - Efficient audio file serving
- **Socket.io** - Real-time updates without polling
- **Lazy Loading** - Components load on demand
- **Caching** - Static file caching with Express
- **Code Splitting** - Optimized bundle sizes

## 🚧 Future Enhancements

- [ ] Playlist creation and management
- [ ] Song search and filtering
- [ ] User profiles and avatars
- [ ] Like/favorite songs
- [ ] Song recommendations
- [ ] Audio visualization
- [ ] Mobile app (React Native)
- [ ] Social sharing
- [ ] Comments on songs/albums
- [ ] Cloud storage integration (optional)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation
- Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created with ❤️ by **Guru**

## 🙏 Acknowledgments

- **Anthropic Claude** - AI assistance in development
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io** - Real-time communication
- **PostgreSQL** - Robust database system

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Check [TEST_OVERVIEW.md](./TEST_OVERVIEW.md) for testing help
- Review API test scripts in `backend/tests/`

## 🎯 Quick Start Checklist

- [ ] Node.js 18+ installed
- [ ] PostgreSQL 15+ installed
- [ ] Database created and schema loaded
- [ ] Backend `.env` configured
- [ ] Dependencies installed (backend & frontend)
- [ ] Backend running (`npm run dev`)
- [ ] Frontend running (`npm run dev`)
- [ ] Seed data loaded (optional)
- [ ] Admin user configured
- [ ] Tests passing (`npm test`)

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built with Node.js, React, PostgreSQL, and lots of ☕**

Happy Coding! 🚀
