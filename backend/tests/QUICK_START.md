# Quick Start - API Testing

## 🚀 Run All Tests (One Command)

```bash
# From backend directory
npm test

# OR directly from tests directory
cd tests
./run-all-tests.sh
```

## 📋 Prerequisites Checklist

Before running tests, make sure:

- [ ] Backend server is running (`npm run dev`)
- [ ] PostgreSQL database is running
- [ ] SMTP email is configured in `.env`
- [ ] (Optional) Seed data loaded (`npm run seed:songs`)

## 🎯 Run Specific Tests

```bash
# Authentication tests
npm run test:auth

# Song tests
npm run test:songs

# Album tests
npm run test:albums

# Admin tests (file uploads)
npm run test:admin

# Users & stats tests
npm run test:users
```

## 📊 What to Expect

### Test Output

```
╔════════════════════════════════════════════════════════════╗
║         SPOTIFY CLONE - API TESTING SUITE                 ║
╚════════════════════════════════════════════════════════════╝

ℹ Info: Checking if server is running at http://localhost:5001/api...
✓ PASSED: Server is running!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTHENTICATION TESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Testing: POST /auth/signup - Create new user
✓ PASSED: Sign up new user (Status: 201)

...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Tests: 45
Passed: 43
Failed: 2
```

### Manual Steps Required

During authentication tests, you'll be asked to:

1. **Enter Email Verification Code**
   - Check the email inbox
   - Enter the 6-digit code when prompted

## ⚡ Typical Workflow

```bash
# 1. Start the server (Terminal 1)
cd backend
npm run dev

# 2. Run tests (Terminal 2)
cd backend
npm test
```

## 🔧 Common Issues

### Server Not Running
```
✗ FAILED: Server is not running!
```
**Fix:** Run `npm run dev` in another terminal

### Database Empty (No Songs/Albums)
```
ℹ Info: Found song ID:
```
**Fix:** Run `npm run seed:songs` or `npm run seed:albums`

### Token/Auth Issues
**Fix:** Run all tests together, not individually (auth must run first)

## 📈 Test Coverage

- ✅ **Auth:** Signup, Login, Logout, Email Verification, Password Reset
- ✅ **Songs:** List, Random, Featured, Trending, By ID
- ✅ **Albums:** List, By ID with Songs
- ✅ **Admin:** Create/Delete Songs & Albums with File Uploads
- ✅ **Users:** List, Messages
- ✅ **Stats:** Platform Statistics

Total: **45+ comprehensive tests**

## 🎓 Next Steps

1. Run all tests: `npm test`
2. Review failures (if any) in the output
3. Check backend logs for detailed errors
4. Fix issues and re-run tests

## 📚 Full Documentation

For detailed information, see [README.md](./README.md)

---

**Happy Testing! 🎉**
