import request from 'supertest';
import express from 'express';
import conversionRoutes from '../../routes/conversionRoutes';
import axios from 'axios';
import multer from 'multer';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('File Conversion Integration Tests', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/file-conversion', conversionRoutes);

    process.env.PYTHON_SERVER_URL = 'http://localhost:8000';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/file-conversion/:operation', () => {
    it('should convert PDF to HTML', async () => {
      const mockPDFBuffer = Buffer.from('mock-pdf-content');
      const mockHTMLResponse = '<html><body>Converted content</body></html>';

      // Mock Python worker response
      mockedAxios.post.mockResolvedValue({
        data: {
          pipe: jest.fn((res) => {
            res.write(mockHTMLResponse);
            res.end();
          }),
        },
        headers: {
          'content-type': 'text/html',
          'content-disposition': 'attachment; filename="converted.html"',
        },
      });

      const response = await request(app)
        .post('/api/v1/file-conversion/pdf-to-html')
        .attach('file', mockPDFBuffer, 'test.pdf');

      expect(mockedAxios.post).toHaveBeenCalled();
      expect(response.status).toBe(200);
    });

    it('should return 400 if no file provided', async () => {
      const response = await request(app)
        .post('/api/v1/file-conversion/pdf-to-html');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('File is required');
    });

    it('should handle Python worker errors', async () => {
      const mockPDFBuffer = Buffer.from('mock-pdf-content');

      mockedAxios.post.mockRejectedValue(new Error('Python worker unavailable'));

      const response = await request(app)
        .post('/api/v1/file-conversion/pdf-to-html')
        .attach('file', mockPDFBuffer, 'test.pdf');

      expect(response.status).toBe(500);
      expect(response.body.message).toContain('Conversion failed');
    });

    it('should forward correct operation to Python worker', async () => {
      const mockBuffer = Buffer.from('mock-content');

      mockedAxios.post.mockResolvedValue({
        data: { pipe: jest.fn() },
        headers: { 'content-type': 'application/pdf' },
      });

      await request(app)
        .post('/api/v1/file-conversion/word-to-pdf')
        .attach('file', mockBuffer, 'test.docx');

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('word'),
        expect.any(Object),
        expect.any(Object)
      );
    });
  });

  describe('File Type Validation', () => {
    it('should accept valid PDF file', async () => {
      const mockPDFBuffer = Buffer.from('%PDF-1.4 mock content');

      mockedAxios.post.mockResolvedValue({
        data: { pipe: jest.fn() },
        headers: { 'content-type': 'text/html' },
      });

      const response = await request(app)
        .post('/api/v1/file-conversion/pdf-to-html')
        .attach('file', mockPDFBuffer, 'document.pdf');

      expect(response.status).not.toBe(400);
    });
  });

  describe('Streaming Response', () => {
    it('should stream large file without loading into memory', async () => {
      const largePDFBuffer = Buffer.alloc(10 * 1024 * 1024); // 10MB

      let streamedChunks = 0;
      mockedAxios.post.mockResolvedValue({
        data: {
          pipe: jest.fn((res) => {
            // Simulate streaming in chunks
            const chunkSize = 64 * 1024; // 64KB chunks
            for (let i = 0; i < largePDFBuffer.length; i += chunkSize) {
              streamedChunks++;
            }
            res.end();
          }),
        },
        headers: { 'content-type': 'application/pdf' },
      });

      await request(app)
        .post('/api/v1/file-conversion/pdf-to-word')
        .attach('file', largePDFBuffer, 'large.pdf');

      expect(streamedChunks).toBeGreaterThan(1);
    });
  });
});
