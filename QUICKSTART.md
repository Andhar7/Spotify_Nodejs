# Quick Start Guide

Get your Spotify Clone up and running in 5 minutes! ⚡

## 🚀 Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Gmail account (for email verification)

## ⚡ Quick Setup

### 1. Database Setup (2 minutes)

```bash
# Create database
psql -U postgres -c "CREATE DATABASE auth_db;"

# Load schema
psql -U postgres -d auth_db -f backend/db/schema.sql

# Verify
psql -U postgres -d auth_db -c "\dt"
```

### 2. Backend Setup (1 minute)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings (see below)
nano .env
```

**Minimum .env configuration:**
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/auth_db
JWT_SECRET=your_random_secret_key
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=your-email@gmail.com
```

**Gmail App Password Setup (30 seconds):**
1. Go to Google Account → Security → 2-Step Verification
2. Click "App passwords"
3. Generate password for "Mail"
4. Copy to `SMTP_PASS`

### 3. Frontend Setup (1 minute)

```bash
cd frontend

# Install dependencies
npm install
```

### 4. Load Sample Data (30 seconds)

```bash
cd backend

# Load sample songs
npm run seed:songs

# OR load albums with songs
npm run seed:albums
```

### 5. Start Everything (30 seconds)

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🎉 You're Done!

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5001
- **API Docs:** See README.md

## 🧪 Test It Works

```bash
# Terminal 3 - Run tests
cd backend
npm test
```

## 👤 Create Admin User

After signing up in the app:

```sql
psql -U postgres -d auth_db
UPDATE users SET is_admin = true WHERE email = 'your-email@gmail.com';
```

Or set `ADMIN_EMAIL` in `.env` before signup.

## 📝 First Steps

1. **Sign Up:** Go to http://localhost:3000/signup
2. **Verify Email:** Check your email for 6-digit code
3. **Login:** Use your credentials
4. **Browse Songs:** Click around, play some music!
5. **Admin Panel:** Go to /admin (if you're admin)

## 🐛 Common Issues

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres

# Fix connection string in backend/.env
DATABASE_URL=postgresql://username:password@localhost:5432/auth_db
```

### Email Not Working
- Check SMTP credentials in `.env`
- Use Gmail **App Password**, not regular password
- Enable 2FA on your Google account first

### Port Already in Use
```bash
# Backend (5001)
lsof -ti:5001 | xargs kill -9

# Frontend (3000)
lsof -ti:3000 | xargs kill -9
```

### No Songs Showing
```bash
# Load seed data
cd backend
npm run seed:songs
```

## 📚 What's Next?

- Read full [README.md](./README.md) for detailed docs
- Check [API Documentation](./README.md#-api-documentation)
- Run [comprehensive tests](./TEST_OVERVIEW.md)
- See [Contributing Guide](./CONTRIBUTING.md)

## 🎯 Project Structure

```
spotify/
├── backend/          # Node.js API
│   ├── tests/       # 45+ API tests
│   └── uploads/     # Local file storage
├── frontend/         # React app
└── README.md         # Full documentation
```

## 💡 Pro Tips

- **Seed Data:** Run `npm run seed:albums` for organized data
- **Admin Access:** Set `ADMIN_EMAIL` in `.env` before signup
- **Testing:** Run `npm test` after any API changes
- **File Uploads:** Place your audio/image files in `backend/uploads/`

## ⌨️ Useful Commands

```bash
# Backend
npm run dev          # Start dev server
npm test            # Run all tests
npm run test:auth   # Test auth endpoints
npm run seed:songs  # Load sample songs

# Frontend
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

## 🎵 Sample Workflow

```bash
# 1. Start servers
cd backend && npm run dev &
cd frontend && npm run dev &

# 2. Sign up at http://localhost:3000/signup
# 3. Check email for verification code
# 4. Login and enjoy! 🎉
```

## 🔗 Quick Links

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5001/api
- **Admin Dashboard:** http://localhost:3000/admin
- **Chat:** http://localhost:3000/chat

---

**Need Help?** See [README.md](./README.md) or [open an issue](https://github.com/your-repo/issues)

**Happy Coding! 🚀**
