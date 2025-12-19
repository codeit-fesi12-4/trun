# Testing Documentation

## Overview

This project uses **Vitest** as the testing framework with **React Testing Library** for component testing. The test suite provides comprehensive coverage for utility functions, hooks, stores, and API clients.

## Setup

### Installation

```bash
pnpm install
```

All testing dependencies are included in `package.json`:
- `vitest` - Fast unit test framework
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom matchers for DOM assertions
- `jsdom` - DOM implementation for Node.js
- `@vitejs/plugin-react` - Vite plugin for React

### Configuration

- **vitest.config.ts** - Main Vitest configuration
- **src/__tests__/setup.ts** - Test environment setup

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (auto-rerun on changes)
pnpm test

# Run tests with UI dashboard
pnpm test:ui

# Run tests with coverage report
pnpm test:coverage
```

## Test Organization