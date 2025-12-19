# Test Suite

This directory contains comprehensive unit tests for the Trun project.

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## Test Structure

- `utils/` - Tests for utility functions
- `hooks/` - Tests for React hooks
- `lib/` - Tests for library code (API client, etc.)
- `stores/` - Tests for Zustand stores
- `api/` - Tests for API functions
- `types/` - Tests for TypeScript type utilities

## Test Coverage

The test suite covers:

### Utils
- ✅ `error.util.ts` - API error handling and toast notifications
- ✅ `path.util.ts` - URL path building functions
- ✅ `logout.util.ts` - Logout functionality
- ✅ `validators.utils.ts` - Form validation logic
- ✅ `date.util.ts` - Date formatting utilities
- ✅ `review.util.ts` - Review distribution building
- ✅ `favorite.util.ts` - LocalStorage favorite management

### Lib
- ✅ `apiClient.ts` - HTTP client with error handling

### Stores
- ✅ `loginModal.store.ts` - Login modal state management

## Writing New Tests

1. Create test file matching the source file: `[filename].test.ts`
2. Use descriptive test names that explain the behavior
3. Cover happy paths, edge cases, and error conditions
4. Mock external dependencies appropriately
5. Clean up after tests (setup.ts handles most cleanup)

## Testing Guidelines

- Use `describe` blocks to group related tests
- Use `it` or `test` for individual test cases
- Mock external dependencies (fetch, localStorage, etc.)
- Test both success and failure scenarios
- Aim for high code coverage (>80%)
