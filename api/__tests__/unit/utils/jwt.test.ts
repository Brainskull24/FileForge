import { generateToken, verifyToken } from '../../../utils/jwt';
import jwt from 'jsonwebtoken';

describe('JWT Utils', () => {
  const mockUserId = '507f1f77bcf86cd799439011';
  
  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret-key';
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken({ userId: mockUserId });
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should include userId in token payload', () => {
      const token = generateToken({ userId: mockUserId });
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      expect(decoded.userId).toBe(mockUserId);
    });

    it('should set expiration time', () => {
      const token = generateToken({ userId: mockUserId });
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      expect(decoded.exp).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(Date.now() / 1000);
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token', () => {
      const token = generateToken({ userId: mockUserId });
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(mockUserId);
    });

    it('should throw error for invalid token', () => {
      expect(() => {
        verifyToken('invalid.token.here');
      }).toThrow();
    });

    it('should throw error for expired token', () => {
      const expiredToken = jwt.sign(
        { userId: mockUserId },
        process.env.JWT_SECRET!,
        { expiresIn: '-1s' }
      );
      
      expect(() => {
        verifyToken(expiredToken);
      }).toThrow();
    });

    it('should throw error for token with wrong secret', () => {
      const token = jwt.sign({ userId: mockUserId }, 'wrong-secret');
      
      expect(() => {
        verifyToken(token);
      }).toThrow();
    });
  });
});
