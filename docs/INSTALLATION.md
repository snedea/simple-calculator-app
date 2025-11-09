# Installation Guide

## Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/snedea/simple-calculator-app.git
cd simple-calculator-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Jest (for unit testing)
- Playwright (for E2E testing)
- http-server (for local development)

### 3. Install Playwright Browsers (First Time Only)

```bash
npx playwright install chromium
```

### 4. Start the Application

```bash
npm run dev
```

The calculator will be available at `http://localhost:8080`

## Troubleshooting Common Issues

### Issue: Port 8080 Already in Use

**Solution:** Stop the process using port 8080 or change the port:

```bash
# Stop existing server
lsof -ti:8080 | xargs kill

# Or use a different port
npx http-server -p 3000
```

### Issue: Module Import Errors

**Solution:** Ensure you're serving the app via http-server, not opening `index.html` directly in the browser. ES6 modules require HTTP protocol.

```bash
# Correct
npm run dev

# Incorrect (won't work)
open index.html
```

### Issue: Tests Failing

**Solution:** Make sure all dependencies are installed:

```bash
npm install
npx playwright install chromium
npm test
```

## Uninstallation

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Remove test artifacts
rm -rf test-results playwright-report
```

## Development Setup

For development with auto-reload:

1. Install a file watcher (optional):
```bash
npm install --save-dev nodemon
```

2. Add to package.json scripts:
```json
"dev:watch": "nodemon --watch . --ext js,html,css --exec 'npm run dev'"
```

3. Run:
```bash
npm run dev:watch
```
