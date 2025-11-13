import { Request, Response } from 'express';
import { register, login, logout } from '../../../controllers/authController';
import { UserModel } from '../../../models/userModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../utils/jwt';

// Mock dependencies
jest.mock('../../../models/userModel');
jest.mock('bcryptjs');
jest.mock('../../../utils/jwt');
jest.mock('../../../utils/sendMail');

describe('Auth Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    responseObject = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
    
    mockRequest = {
      body: {},
      file: undefined,
    };
    
    mockResponse = responseObject;
    
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      mockRequest.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      (UserModel.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (UserModel.prototype.save as jest.Mock).mockResolvedValue({
        _id: '123',
        email: 'test@example.com',
      });

      await register(mockRequest as Request, mockResponse as Response);

      expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(responseObject.status).toHaveBeenCalledWith(201);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: 'Registered. Please verify email.',
      });
    });

    it('should return error if email already exists', async () => {
      mockRequest.body = {
        email: 'existing@example.com',
        password: 'password123',
      };

      (UserModel.findOne as jest.Mock).mockResolvedValue({
        email: 'existing@example.com',
      });

      await register(mockRequest as Request, mockResponse as Response);

      expect(responseObject.status).toHaveBeenCalledWith(400);
      expect(responseObject.json).toHaveBeenCalledWith({
        error: 'Email already in use',
      });
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        _id: '123',
        email: 'test@example.com',
        password: 'hashedPassword',
        verified: true,
        name: 'Test User',
      };

      (UserModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockUser),
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue('mock-jwt-token');
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUser);

      await login(mockRequest as Request, mockResponse as Response);

      expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(generateToken).toHaveBeenCalledWith({ userId: '123' });
      expect(responseObject.cookie).toHaveBeenCalledWith(
        'token',
        'mock-jwt-token',
        expect.any(Object)
      );
      expect(responseObject.json).toHaveBeenCalledWith({
        success: true,
        user: expect.objectContaining({
          email: 'test@example.com',
        }),
      });
    });

    it('should return error for invalid credentials', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      (UserModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          email: 'test@example.com',
          password: 'hashedPassword',
        }),
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await login(mockRequest as Request, mockResponse as Response);

      expect(responseObject.status).toHaveBeenCalledWith(400);
      expect(responseObject.json).toHaveBeenCalledWith({
        error: 'Invalid credentials',
      });
    });

    it('should return error for unverified email', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      (UserModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          email: 'test@example.com',
          password: 'hashedPassword',
          verified: false,
        }),
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await login(mockRequest as Request, mockResponse as Response);

      expect(responseObject.status).toHaveBeenCalledWith(403);
      expect(responseObject.json).toHaveBeenCalledWith({
        error: 'Email not verified',
      });
    });
  });

  describe('logout', () => {
    it('should clear auth cookie and return success', async () => {
      await logout(mockRequest as Request, mockResponse as Response);

      expect(responseObject.clearCookie).toHaveBeenCalledWith(
        'token',
        expect.any(Object)
      );
      expect(responseObject.json).toHaveBeenCalledWith({
        message: 'Logged out successfully',
      });
    });
  });
});
