# Use official Playwright image with all browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Install Playwright browsers (already included in the base image, but ensuring latest)
RUN npx playwright install --with-deps

# Create directories for test results
RUN mkdir -p test-results playwright-report

# Set environment variable for CI
ENV CI=true

# Default command to run tests
CMD ["npx", "playwright", "test", "--reporter=html"]

