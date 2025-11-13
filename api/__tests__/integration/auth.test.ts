import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import authRoutes from '../../routes/authRoutes';
import { UserModel } from '../../models/userModel';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

let mongoServer: MongoMemoryServer;
let app: express.Application;

beforeAll(async () => {
  // Setup in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Setup Express app
  app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/api/v1/auth', authRoutes);

  // Set test environment
  process.env.JWT_SECRET = 'test-secret';
  process.env.NODE_ENV = 'test';
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean up database after each test
  await UserModel.deleteMany({});
});

describe('Auth Integration Tests', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('verify email');

      // Verify user was created in database
      const user = await UserModel.findOne({ email: 'test@example.com' });
      expect(user).toBeDefined();
      expect(user?.name).toBe('Test User');
      expect(user?.verified).toBe(false);
    });

    it('should not register duplicate email', async () => {
      // Create first user
      await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'User One',
          email: 'duplicate@example.com',
          password: 'password123',
        });

      // Try to create second user with same email
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'User Two',
          email: 'duplicate@example.com',
          password: 'password456',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('already in use');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          // Missing name and password
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      // Create a verified user for login tests
      const user = new UserModel({
        name: 'Test User',
        email: 'login@example.com',
        password: await require('bcryptjs').hash('password123', 10),
        verified: true,
        createdVia: 'custom',
      });
      await user.save();
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toHaveProperty('email', 'login@example.com');
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should not login with invalid password', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid credentials');
    });

    it('should not login unverified user', async () => {
      // Create unverified user
      const unverifiedUser = new UserModel({
        name: 'Unverified User',
        email: 'unverified@example.com',
        password: await require('bcryptjs').hash('password123', 10),
        verified: false,
        createdVia: 'custom',
      });
      await unverifiedUser.save();

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'unverified@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(403);
      expect(response.body.error).toContain('not verified');
    });

    it('should not login non-existent user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid credentials');
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    it('should logout and clear cookie', async () => {
      const response = await request(app)
        .post('/api/v1/auth/logout');

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('Logged out');
    });
  });

  describe('Full Auth Flow', () => {
    it('should complete register -> verify -> login flow', async () => {
      // Step 1: Register
      const registerResponse = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Flow Test User',
          email: 'flow@example.com',
          password: 'password123',
        });

      expect(registerResponse.status).toBe(201);

      // Step 2: Manually verify user (simulating email verification)
      await UserModel.findOneAndUpdate(
        { email: 'flow@example.com' },
        { verified: true, verificationToken: '' }
      );

      // Step 3: Login
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'flow@example.com',
          password: 'password123',
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body.user.email).toBe('flow@example.com');

      // Step 4: Logout
      const logoutResponse = await request(app)
        .post('/api/v1/auth/logout');

      expect(logoutResponse.status).toBe(200);
    });
  });
});
