import { Request, Response, NextFunction } from 'express';
import { authenticate } from '../../../middlewares/authenticate';
import { verifyToken } from '../../../utils/jwt';
import { UserModel } from '../../../models/userModel';

jest.mock('../../../utils/jwt');
jest.mock('../../../models/userModel');

describe('Authenticate Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;
  let responseObject: any;

  beforeEach(() => {
    responseObject = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockRequest = {
      cookies: {},
    };

    mockResponse = responseObject;
    nextFunction = jest.fn();

    jest.clearAllMocks();
  });

  it('should authenticate valid token', async () => {
    mockRequest.cookies = { token: 'valid-token' };

    const mockUser = {
      _id: '123',
      email: 'test@example.com',
      name: 'Test User',
    };

    (verifyToken as jest.Mock).mockReturnValue({ userId: '123' });
    (UserModel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockUser),
      }),
    });

    await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(verifyToken).toHaveBeenCalledWith('valid-token');
    expect(UserModel.findById).toHaveBeenCalledWith('123');
    expect(mockRequest.user).toEqual(mockUser);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should reject request without token', async () => {
    mockRequest.cookies = {};

    await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(responseObject.status).toHaveBeenCalledWith(401);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Authentication required',
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should reject invalid token', async () => {
    mockRequest.cookies = { token: 'invalid-token' };

    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(responseObject.status).toHaveBeenCalledWith(401);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Invalid or expired token',
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should reject if user not found', async () => {
    mockRequest.cookies = { token: 'valid-token' };

    (verifyToken as jest.Mock).mockReturnValue({ userId: '123' });
    (UserModel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      }),
    });

    await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(responseObject.status).toHaveBeenCalledWith(401);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'User not found',
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
