# Spotify Clone - API Testing Suite

Comprehensive curl-based tests for all backend API endpoints.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Understanding Results](#understanding-results)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This testing suite provides comprehensive coverage of all backend API endpoints using curl commands. Tests are organized into logical groups and can be run individually or all together.

## ✅ Prerequisites

Before running tests, ensure:

1. **Backend server is running:**
   ```bash
   cd backend
   npm run dev
   ```
   Server should be running on `http://localhost:5001`

2. **Database is set up:**
   ```bash
   # Make sure PostgreSQL is running and database is created
   psql -U guru -d auth_db
   ```

3. **Seed data (optional but recommended):**
   ```bash
   npm run seed:songs
   # or
   npm run seed:albums
   ```

4. **Email service configured:**
   - Tests require email verification
   - Make sure SMTP settings are configured in `.env`

## 🚀 Quick Start

Run all tests with a single command:

```bash
cd backend/tests
./run-all-tests.sh
```

That's it! The script will:
- ✅ Check if server is running
- ✅ Run all test suites
- ✅ Display colorful output with pass/fail status
- ✅ Provide detailed summary

## 📁 Test Structure

```
tests/
├── run-all-tests.sh        # Main test runner (run this!)
├── test-helpers.sh         # Utility functions and helpers
├── test-auth.sh            # Authentication endpoint tests
├── test-songs.sh           # Song endpoint tests
├── test-albums.sh          # Album endpoint tests
├── test-admin.sh           # Admin endpoint tests
├── test-users-stats.sh     # Users and statistics tests
├── test-files/             # Generated test files for uploads
└── README.md               # This file
```

## 🎮 Running Tests

### Run All Tests

```bash
./run-all-tests.sh
```

### Run Specific Test Suite

```bash
# Authentication tests only
./run-all-tests.sh auth

# Song tests only
./run-all-tests.sh songs

# Album tests only
./run-all-tests.sh albums

# Admin tests only
./run-all-tests.sh admin

# Users & stats tests only
./run-all-tests.sh users
```

### Run Individual Test File

```bash
# Source helpers first
source ./test-helpers.sh

# Then run specific test
source ./test-auth.sh && test_auth
```

## 🧪 Test Coverage

### Authentication Tests (`test-auth.sh`)
- ✅ POST `/api/auth/signup` - User registration
- ✅ POST `/api/auth/login` - User login
- ✅ POST `/api/auth/logout` - User logout
- ✅ POST `/api/auth/verify-email` - Email verification
- ✅ POST `/api/auth/forgot-password` - Password reset request
- ✅ GET `/api/auth/check-auth` - Authentication status
- ✅ Login with wrong password (negative test)
- ✅ Login without verification (negative test)
- ✅ Sign up with existing email (negative test)

**Note:** Auth tests require manual email verification code input.

### Song Tests (`test-songs.sh`)
- ✅ GET `/api/songs` - Get all songs
- ✅ GET `/api/songs/random` - Get random songs
- ✅ GET `/api/songs/featured` - Get featured songs
- ✅ GET `/api/songs/trending` - Get trending songs
- ✅ GET `/api/songs/:id` - Get song by ID
- ✅ GET `/api/songs/99999` - Non-existent song (negative test)

### Album Tests (`test-albums.sh`)
- ✅ GET `/api/albums` - Get all albums
- ✅ GET `/api/albums/:id` - Get album by ID with songs
- ✅ GET `/api/albums/99999` - Non-existent album (negative test)

### Admin Tests (`test-admin.sh`)
- ✅ GET `/api/admin/check` - Check admin status
- ✅ POST `/api/admin/songs` - Create song with file upload
- ✅ POST `/api/admin/albums` - Create album with file upload
- ✅ DELETE `/api/admin/songs/:id` - Delete song
- ✅ DELETE `/api/admin/albums/:id` - Delete album
- ✅ Create song without files (negative test)
- ✅ Create album without image (negative test)
- ✅ Delete non-existent resources (negative tests)

**Note:** Admin tests automatically create dummy test files for upload testing.

### Users & Stats Tests (`test-users-stats.sh`)
- ✅ GET `/api/users` - Get all users
- ✅ GET `/api/users/messages/:userId` - Get messages with user
- ✅ POST `/api/users/messages` - Send message
- ✅ GET `/api/stats` - Get platform statistics
- ✅ Send empty message (negative test)
- ✅ Send message without receiver (negative test)

## 📊 Understanding Results

### Color Coding

- 🟢 **GREEN** - Test passed successfully
- 🔴 **RED** - Test failed
- 🟡 **YELLOW** - Information/warnings
- 🔵 **BLUE** - Section headers
- 🔷 **CYAN** - Important info

### Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTHENTICATION TESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Testing: POST /auth/signup - Create new user
✓ PASSED: Sign up new user (Status: 201)

Testing: POST /auth/login - Login without email verification
✗ FAILED: Login without verification (Expected: 403, Got: 401)
   Response: {"success":false,"message":"Invalid credentials"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Tests: 45
Passed: 42
Failed: 3
```

### Exit Codes

- `0` - All tests passed
- `1` - One or more tests failed

## 🔧 Troubleshooting

### Server Not Running
```
✗ FAILED: Server is not running!
```
**Solution:** Start the backend server:
```bash
cd backend
npm run dev
```

### Database Connection Error
```
✗ FAILED: Database connection failed
```
**Solution:** Ensure PostgreSQL is running and database exists:
```bash
psql -U guru -d auth_db
```

### No Songs/Albums Found
```
ℹ Info: Found song ID:
ℹ Info: Skipping song by ID test (no song ID available)
```
**Solution:** Run seed scripts to populate database:
```bash
npm run seed:songs
# or
npm run seed:albums
```

### Email Verification Timeout
```
Enter the 6-digit verification code:
```
**Solution:**
- Check your email (the test creates a real user)
- Make sure SMTP settings are correct in `.env`
- Enter the code when prompted

### File Upload Failures
```
✗ FAILED: Create song (Expected: 201, Got: 400)
```
**Solution:**
- Test files are auto-generated in `test-files/` directory
- If upload still fails, check backend logs
- Ensure `/backend/uploads/` directory is writable

### Token Issues
```
✗ FAILED: Check auth status (Expected: 200, Got: 401)
```
**Solution:**
- Tests must run in order (auth tests first)
- Token is stored in `ACCESS_TOKEN` variable
- Don't run individual tests without auth setup

## 📝 Manual Testing Examples

### Test Individual Endpoint

```bash
# Get all songs
curl http://localhost:5001/api/songs

# Get song by ID
curl http://localhost:5001/api/songs/1

# Login (get token)
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Upload song (with auth)
curl -X POST http://localhost:5001/api/admin/songs \
  -b "token=YOUR_TOKEN_HERE" \
  -F "title=My Song" \
  -F "artist=Artist Name" \
  -F "duration=180" \
  -F "audioFile=@/path/to/audio.mp3" \
  -F "imageFile=@/path/to/image.jpg"
```

## 🎯 Best Practices

1. **Run tests in order:** Authentication tests must run first
2. **Clean database:** Consider resetting database between full test runs
3. **Check logs:** Backend logs provide detailed error information
4. **Manual verification:** Some tests require manual email verification
5. **Test data:** Use seed scripts for consistent test data

## 📈 Adding New Tests

To add new tests:

1. Create a new test file: `test-newfeature.sh`
2. Source the helpers: `source "$(dirname "$0")/test-helpers.sh"`
3. Create test function: `test_newfeature() { ... }`
4. Use helper functions: `api_get`, `api_post`, `api_delete`
5. Add to main runner: Source and call in `run-all-tests.sh`

Example:
```bash
#!/bin/bash
source "$(dirname "$0")/test-helpers.sh"

test_myfeature() {
    print_header "MY FEATURE TESTS"

    print_test "GET /api/myendpoint - Test description"
    api_get "/myendpoint" "Test description" 200

    print_info "Tests completed"
}

export -f test_myfeature
```

## 🤝 Contributing

When adding new endpoints to the API:
1. Add corresponding tests in appropriate test file
2. Update this README with new test coverage
3. Ensure tests pass before committing

## 📄 License

Part of the Spotify Clone project.

---

**Happy Testing! 🎉**

For issues or questions, check the backend logs or contact the development team.
