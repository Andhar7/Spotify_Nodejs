# Contributing to Spotify Clone

First off, thank you for considering contributing to Spotify Clone! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Messages](#commit-messages)

## 📜 Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. By participating, you are expected to uphold this code.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers
- ✅ Focus on constructive feedback
- ✅ Accept responsibility for mistakes
- ❌ No harassment or trolling
- ❌ No offensive language

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, etc.)

**Bug Report Template:**

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Node version: [e.g. 18.0.0]
- Browser: [e.g. Chrome 120]
```

### Suggesting Enhancements

Enhancement suggestions are welcome! Include:

- **Clear title and description**
- **Use case** - why is this needed?
- **Proposed solution**
- **Alternatives considered**
- **Additional context**

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `bug` - Something isn't working
- `enhancement` - New feature or request

## 🛠️ Development Setup

### 1. Fork and Clone

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/spotify-clone.git
cd spotify-clone
```

### 2. Set Up Backend

```bash
cd backend
npm install

# Set up database
psql -U postgres -c "CREATE DATABASE auth_db;"
psql -U postgres -d auth_db -f db/schema.sql

# Create .env file (see README.md)
cp .env.example .env
# Edit .env with your configuration
```

### 3. Set Up Frontend

```bash
cd frontend
npm install
```

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Verify Setup

```bash
# Run tests
cd backend
npm test
```

## 🔄 Pull Request Process

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run specific tests
npm run test:auth
npm run test:songs

# Test manually
# - Start backend and frontend
# - Test the feature thoroughly
# - Check browser console for errors
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add awesome feature"
```

See [Commit Messages](#commit-messages) section for format.

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:

- **Clear title** describing the change
- **Description** of what was changed and why
- **Screenshots** (for UI changes)
- **Testing done**
- **Related issues** (if any)

**Pull Request Template:**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran

## Checklist
- [ ] My code follows the project style
- [ ] I have added tests
- [ ] All tests pass
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
```

### 6. Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged

## 💻 Coding Standards

### Backend (Node.js)

**File Structure:**
```javascript
// 1. Imports
import express from "express";
import { someFunction } from "./utils.js";

// 2. Constants
const PORT = 5001;

// 3. Functions
const myFunction = () => {
  // Implementation
};

// 4. Exports
export default myFunction;
```

**Naming Conventions:**
- `camelCase` for variables and functions
- `PascalCase` for classes
- `UPPER_SNAKE_CASE` for constants
- Descriptive names (avoid `x`, `data`, `temp`)

**Best Practices:**
```javascript
// ✅ Good
const getUserById = async (id) => {
  const user = await query("SELECT * FROM users WHERE id = $1", [id]);
  return user.rows[0];
};

// ❌ Bad
const get = async (i) => {
  const d = await query("SELECT * FROM users WHERE id = " + i);
  return d.rows[0];
};
```

### Frontend (React + TypeScript)

**Component Structure:**
```typescript
// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// 3. Component
const MyComponent = ({ title, onAction }: MyComponentProps) => {
  // 3a. State
  const [isActive, setIsActive] = useState(false);

  // 3b. Effects
  useEffect(() => {
    // ...
  }, []);

  // 3c. Handlers
  const handleClick = () => {
    setIsActive(true);
    onAction();
  };

  // 3d. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Click Me</Button>
    </div>
  );
};

// 4. Export
export default MyComponent;
```

**Naming Conventions:**
- `PascalCase` for components
- `camelCase` for functions and variables
- `kebab-case` for file names (optional)

**Best Practices:**
- Use TypeScript types
- Extract reusable logic to custom hooks
- Keep components small and focused
- Use meaningful prop names

### CSS/Styling

**Tailwind CSS:**
```tsx
// ✅ Good - organized classes
<div className='flex items-center justify-between p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700'>

// ❌ Bad - unorganized
<div className='p-4 bg-zinc-800 flex rounded-lg items-center hover:bg-zinc-700 justify-between'>
```

**Order:** Layout → Spacing → Sizing → Colors → Effects

## 🧪 Testing Guidelines

### Backend Tests

Add tests for new endpoints in `backend/tests/`:

```bash
# In test-songs.sh
print_test "GET /songs/new-endpoint - Description"
api_get "/songs/new-endpoint" "Test description" 200
```

### Testing Checklist

- [ ] All existing tests pass
- [ ] New tests added for new features
- [ ] Edge cases tested
- [ ] Error cases tested
- [ ] Manual testing completed

### Test Types

1. **Unit Tests** - Test individual functions
2. **Integration Tests** - Test API endpoints (our curl tests)
3. **Manual Tests** - Test UI functionality

## 📝 Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples

```bash
# Simple commit
git commit -m "feat: add song shuffle functionality"

# With scope
git commit -m "fix(auth): resolve token expiration issue"

# With body
git commit -m "feat: add playlist creation

- Add playlist model
- Create API endpoints
- Update frontend UI"

# Breaking change
git commit -m "feat!: change API response format

BREAKING CHANGE: API now returns data in camelCase instead of snake_case"
```

## 📚 Documentation

When adding features, update:

- **README.md** - If changing setup or features
- **API Documentation** - For new endpoints
- **Code Comments** - For complex logic
- **Type Definitions** - For TypeScript changes

## 🐛 Debugging Tips

### Backend Debugging

```javascript
// Add detailed logging
console.log("User ID:", userId);
console.log("Query result:", result.rows);

// Check database queries
// In PostgreSQL:
SELECT * FROM users WHERE id = 1;
```

### Frontend Debugging

```typescript
// React DevTools
// Chrome Extension for component inspection

// Console logging
console.log("State:", state);
console.log("Props:", props);

// Network tab
// Check API requests/responses
```

## 🎯 Code Review Checklist

Before submitting PR:

- [ ] Code follows project style
- [ ] No console.log statements (unless necessary)
- [ ] No commented-out code
- [ ] Variables have meaningful names
- [ ] Functions are small and focused
- [ ] Tests are added/updated
- [ ] Documentation is updated
- [ ] No linting errors
- [ ] All tests pass

## 🚀 Release Process

(For maintainers)

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create git tag: `git tag -a v1.0.0 -m "Version 1.0.0"`
4. Push tag: `git push origin v1.0.0`
5. Create GitHub release

## ❓ Questions?

Feel free to:

- Open an issue with the `question` label
- Check existing documentation
- Review closed issues/PRs

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- GitHub contributors page

---

Thank you for contributing! 🙏

Your efforts help make this project better for everyone. ❤️
