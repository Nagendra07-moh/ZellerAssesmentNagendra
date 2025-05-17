// Mock react-native animated
jest.mock('react-native-reanimated', () => {
  return {
    Value: jest.fn(),
    timing: jest.fn(() => ({ start: jest.fn() })),
    spring: jest.fn(() => ({ start: jest.fn() })),
    createAnimatedComponent: jest.fn(() => {}),
  };
});

// Add any global mocks here
global.fetch = require('jest-fetch-mock').default;

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
}); 