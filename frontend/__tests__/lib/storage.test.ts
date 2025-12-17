import { storage } from '@/lib/storage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock document.cookie
let cookieStore = '';
Object.defineProperty(document, 'cookie', {
  get: jest.fn(() => cookieStore),
  set: jest.fn((value: string) => {
    cookieStore = value;
  }),
  configurable: true,
});

describe('storage', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    localStorageMock.clear();
    cookieStore = '';
  });

  describe('getToken', () => {
    it('should return null when no token is stored', () => {
      const result = storage.getToken();
      expect(result).toBeNull();
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
    });

    it('should return token when stored', () => {
      localStorageMock.setItem('authToken', 'test-token-123');
      const result = storage.getToken();
      expect(result).toBe('test-token-123');
    });
  });

  describe('setToken', () => {
    it('should store token in localStorage', () => {
      storage.setToken('new-token-456');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', 'new-token-456');
    });

    it('should also set cookie with token', () => {
      storage.setToken('cookie-token');
      expect(document.cookie).toContain('authToken=cookie-token');
    });
  });

  describe('removeToken', () => {
    it('should remove token from localStorage', () => {
      localStorageMock.setItem('authToken', 'token-to-remove');
      storage.removeToken();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
    });

    it('should expire the cookie', () => {
      storage.removeToken();
      expect(document.cookie).toContain('expires=Thu, 01 Jan 1970');
    });
  });

  describe('getUser', () => {
    it('should return null when no user is stored', () => {
      const result = storage.getUser();
      expect(result).toBeNull();
    });

    it('should return parsed user object when stored', () => {
      const user = { id: '1', email: 'test@example.com', name: 'Test User' };
      localStorageMock.setItem('authUser', JSON.stringify(user));
      const result = storage.getUser();
      expect(result).toEqual(user);
    });
  });

  describe('setUser', () => {
    it('should store user as JSON string', () => {
      const user = { id: '1', email: 'test@example.com', name: 'Test User' };
      storage.setUser(user);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('authUser', JSON.stringify(user));
    });
  });

  describe('removeUser', () => {
    it('should remove user from localStorage', () => {
      storage.removeUser();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authUser');
    });
  });

  describe('clear', () => {
    it('should remove both token and user from localStorage', () => {
      storage.clear();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authUser');
    });

    it('should expire the auth cookie', () => {
      storage.clear();
      expect(document.cookie).toContain('expires=Thu, 01 Jan 1970');
    });
  });
});
