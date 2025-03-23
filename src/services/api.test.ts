import axios from 'axios';
import { vi, describe, it, expect } from 'vitest';
import { createAPI } from './api';

vi.mock('../const/const', () => ({
  ServerParam: {
    BaseURL: 'https://example.com',
    TimeResponse: 5000,
  },
}));

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      interceptors: {
        response: {
          use: vi.fn(),
        },
      },
    })),
  },
}));

describe('createAPI', () => {
  it('should configure axios instance with correct settings', () => {
    const mockCreate = vi.mocked(axios.create);

    createAPI();

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://example.com',
      timeout: 5000,
    });
  });
});
