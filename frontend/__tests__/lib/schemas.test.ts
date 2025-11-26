import { loginSchema } from '@/lib/schemas/loginSchema';
import { registerSchema } from '@/lib/schemas/registerSchema';
import { forgotPasswordSchema } from '@/lib/schemas/forgotPasswordSchema';

describe('loginSchema', () => {
  describe('valid inputs', () => {
    it('should accept valid email and password', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });



    it('should accept password with exactly 6 characters', () => {
      const validData = {
        email: 'test@example.com',
        password: '123456',
      };
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('invalid inputs', () => {
    it('should reject empty email', () => {
      const invalidData = {
        email: '',
        password: 'password123',
      };
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject password shorter than 6 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345',
      };
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject missing email field', () => {
      const invalidData = {
        password: 'password123',
      };
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject missing password field', () => {
      const invalidData = {
        email: 'test@example.com',
      };
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

describe('registerSchema', () => {
  describe('valid inputs', () => {
    it('should accept valid registration data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept name with exactly 2 characters', () => {
      const validData = {
        name: 'Jo',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });


  });

  describe('invalid inputs', () => {
    it('should reject name shorter than 2 characters', () => {
      const invalidData = {
        name: 'J',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject mismatched passwords', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'different123',
      };
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
        confirmPassword: 'password123',
      };
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject empty name', () => {
      const invalidData = {
        name: '',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject password shorter than 6 characters', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '12345',
        confirmPassword: '12345',
      };
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

describe('forgotPasswordSchema', () => {
  describe('valid inputs', () => {
    it('should accept valid email', () => {
      const validData = {
        email: 'test@example.com',
      };
      const result = forgotPasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });



    it('should accept different valid email formats', () => {
      const validEmails = [
        'user@domain.com',
        'user.name@domain.com',
        'user+tag@domain.com',
        'user@subdomain.domain.com',
      ];
      
      validEmails.forEach((email) => {
        const result = forgotPasswordSchema.safeParse({ email });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('invalid inputs', () => {
    it('should reject empty email', () => {
      const invalidData = {
        email: '',
      };
      const result = forgotPasswordSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
      };
      const result = forgotPasswordSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject email without domain', () => {
      const invalidData = {
        email: 'user@',
      };
      const result = forgotPasswordSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject missing email field', () => {
      const invalidData = {};
      const result = forgotPasswordSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
