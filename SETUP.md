# Setup Instructions

## Local Setup

### Install Dependencies
```bash
npm install
npx playwright install
```

### Run Tests
```bash
npm test
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:ui
npm run test:report
```

## Docker Setup

### Run Tests in Docker
```bash
docker-compose up playwright-tests
docker-compose up playwright-chromium
docker-compose up playwright-firefox
docker-compose up playwright-webkit
```

## GitHub Repository Setup

### 1. Create Repository
1. Create new repository on GitHub
2. Do not initialize with README

### 2. Push Code
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 3. Configure GitHub Pages
1. Go to Settings → Pages
2. Source: GitHub Actions
3. Save

### 4. Set Permissions
1. Go to Settings → Actions → General
2. Workflow permissions: Read and write permissions
3. Save

### 5. Update README Badges
Replace `YOUR_USERNAME` and `YOUR_REPO` in README.md

## Test Reports

- **Local**: `playwright-report/index.html`
- **GitHub Pages**: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
- **Error Logs**: `test-results/error-logs/`

## CI/CD

Tests run automatically on:
- Push to main/develop
- Pull requests
- Daily at 2 AM UTC
- Manual trigger

## Configuration

Edit `playwright.config.ts` to modify:
- Base URL
- Browsers
- Timeouts
- Retries
- Workers

