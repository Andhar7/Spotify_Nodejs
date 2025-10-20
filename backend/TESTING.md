# API Testing Guide

This project includes a comprehensive curl-based testing suite for all backend endpoints.

## 🎯 Quick Start

Run all tests with a single command:

```bash
npm test
```

## 📁 Test Files Location

All test files are in the `tests/` directory:

```
backend/tests/
├── run-all-tests.sh        # Main test runner
├── test-helpers.sh         # Utility functions
├── test-auth.sh            # Authentication tests
├── test-songs.sh           # Song endpoint tests
├── test-albums.sh          # Album endpoint tests
├── test-admin.sh           # Admin endpoint tests
├── test-users-stats.sh     # Users & stats tests
├── README.md               # Full documentation
└── QUICK_START.md          # Quick reference
```

## 🚀 Running Tests

### All Tests
```bash
npm test
```

### Specific Test Suites
```bash
npm run test:auth      # Authentication tests
npm run test:songs     # Song tests
npm run test:albums    # Album tests
npm run test:admin     # Admin tests (file uploads)
npm run test:users     # Users & stats tests
```

### Direct Execution
```bash
cd tests
./run-all-tests.sh           # All tests
./run-all-tests.sh auth      # Just auth tests
```

## 📋 What Gets Tested

### Authentication (`test:auth`)
- User signup with email verification
- Login/logout
- Password reset
- Protected route access
- Negative test cases (wrong password, duplicate email, etc.)

### Songs (`test:songs`)
- Get all songs
- Get random/featured/trending songs
- Get song by ID
- Error handling

### Albums (`test:albums`)
- Get all albums
- Get album by ID with songs
- Error handling

### Admin (`test:admin`)
- Create/delete songs with file upload
- Create/delete albums with image upload
- Admin authorization
- Error handling

### Users & Stats (`test:users`)
- Get all users
- Send/receive messages
- Platform statistics
- Error handling

## ✅ Prerequisites

Before running tests:

1. **Start the backend server:**
   ```bash
   npm run dev
   ```

2. **Ensure database is running:**
   ```bash
   psql -U guru -d auth_db
   ```

3. **Load seed data (optional):**
   ```bash
   npm run seed:songs
   ```

4. **Configure email in `.env`:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

## 📊 Test Output

Tests provide colorful, detailed output:

```
╔════════════════════════════════════════════════════════════╗
║         SPOTIFY CLONE - API TESTING SUITE                 ║
╚════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTHENTICATION TESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Testing: POST /auth/signup - Create new user
✓ PASSED: Sign up new user (Status: 201)

Testing: POST /auth/login - Login with verified account
✓ PASSED: Login successfully (Status: 200)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Tests: 45
Passed: 45
Failed: 0
All tests passed! 🎉
```

## 🎓 Test Features

- ✅ **Colored Output** - Easy to read pass/fail status
- ✅ **Automatic Server Check** - Verifies server is running
- ✅ **Session Management** - Handles authentication tokens
- ✅ **File Upload Testing** - Auto-generates test files
- ✅ **Comprehensive Coverage** - All endpoints tested
- ✅ **Negative Testing** - Tests error conditions
- ✅ **Detailed Logging** - Shows request/response data
- ✅ **Exit Codes** - 0 for success, 1 for failures

## 🔧 Troubleshooting

### Server Not Running
If you see: `✗ FAILED: Server is not running!`

**Solution:**
```bash
npm run dev
```

### Database Empty
If tests show: `ℹ Info: Found song ID:`

**Solution:**
```bash
npm run seed:songs
```

### Email Verification Required
Some auth tests require manual email verification code entry.

**Solution:** Check your email and enter the 6-digit code when prompted.

## 📚 Documentation

For detailed documentation, see:
- `tests/README.md` - Complete testing guide
- `tests/QUICK_START.md` - Quick reference
- Individual test files for specific endpoint tests

## 🎯 Coverage Summary

| Endpoint Type | Tests | Coverage |
|--------------|-------|----------|
| Authentication | 11 | 100% |
| Songs | 7 | 100% |
| Albums | 3 | 100% |
| Admin | 10 | 100% |
| Users | 6 | 100% |
| Stats | 1 | 100% |
| Messages | 7 | 100% |
| **TOTAL** | **45+** | **100%** |

## 🛠️ Adding New Tests

To add tests for new endpoints:

1. Edit appropriate test file in `tests/`
2. Use helper functions from `test-helpers.sh`
3. Follow existing test patterns
4. Update this documentation

Example:
```bash
# In test-songs.sh
print_test "GET /songs/new-endpoint - Test description"
api_get "/songs/new-endpoint" "Test description" 200
```

## 🤝 Contributing

When adding new API endpoints:
1. Add corresponding tests
2. Ensure all tests pass
3. Update documentation

---

**Happy Testing! 🎉**

For more information, see the full documentation in `tests/README.md`
