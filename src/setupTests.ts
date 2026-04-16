import '@testing-library/jest-dom';

const chromeMock = {
  storage: {
    sync: {
      get: jest.fn(),
      set: jest.fn(),
    },
    onChanged: {
      addListener: jest.fn(),
    },
  },
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    },
    sendMessage: jest.fn(),
  },
  tabs: {
    query: jest.fn(),
    sendMessage: jest.fn(),
  },
  webRequest: {
    onCompleted: {
      addListener: jest.fn(),
    },
  },
};

(global as any).chrome = chromeMock;
