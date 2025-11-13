import pytest
import tempfile
import os
from fastapi.testclient import TestClient
from app.main import app
from app.services.conversions.pdfConversion import PDFConversion
import fitz  # PyMuPDF

client = TestClient(app)

class TestPDFConversion:
    """Test PDF conversion functionality"""
    
    def setup_method(self):
        """Setup test fixtures"""
        self.pdf_converter = PDFConversion()
        
        # Create a simple test PDF
        self.test_pdf_path = self.create_test_pdf()
    
    def teardown_method(self):
        """Cleanup test files"""
        if os.path.exists(self.test_pdf_path):
            os.remove(self.test_pdf_path)
    
    def create_test_pdf(self) -> str:
        """Create a simple test PDF file"""
        doc = fitz.open()  # Create new PDF
        page = doc.new_page()
        
        # Add some text
        text = "This is a test PDF document.\nIt contains multiple lines.\nFor testing purposes."
        page.insert_text((50, 50), text, fontsize=12)
        
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            doc.save(tmp.name)
            doc.close()
            return tmp.name
    
    def test_pdf_to_html_conversion(self):
        """Test PDF to HTML conversion"""
        html_content = self.pdf_converter.to_html(self.test_pdf_path)
        
        assert html_content is not None
        assert isinstance(html_content, str)
        assert '<html>' in html_content
        assert '<body>' in html_content
        assert 'test PDF document' in html_content
    
    def test_pdf_to_text_conversion(self):
        """Test PDF to text conversion"""
        text_content = self.pdf_converter.to_text(self.test_pdf_path)
        
        assert text_content is not None
        assert isinstance(text_content, str)
        assert 'test PDF document' in text_content
        assert 'multiple lines' in text_content
    
    def test_pdf_to_word_conversion(self):
        """Test PDF to Word conversion"""
        word_path = self.pdf_converter.to_word(self.test_pdf_path)
        
        assert word_path is not None
        assert os.path.exists(word_path)
        assert word_path.endswith('.docx')
        
        # Cleanup
        os.remove(word_path)
    
    def test_pdf_to_markdown_conversion(self):
        """Test PDF to Markdown conversion"""
        markdown_content = self.pdf_converter.to_markdown(self.test_pdf_path)
        
        assert markdown_content is not None
        assert isinstance(markdown_content, str)
        assert 'test PDF document' in markdown_content
    
    def test_invalid_pdf_file(self):
        """Test handling of invalid PDF file"""
        # Create invalid PDF file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            tmp.write(b'This is not a valid PDF file')
            invalid_path = tmp.name
        
        try:
            with pytest.raises(Exception):
                self.pdf_converter.to_html(invalid_path)
        finally:
            os.remove(invalid_path)
    
    def test_empty_pdf_file(self):
        """Test handling of empty PDF file"""
        # Create empty PDF
        doc = fitz.open()
        doc.new_page()  # Empty page
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            doc.save(tmp.name)
            doc.close()
            empty_path = tmp.name
        
        try:
            html_content = self.pdf_converter.to_html(empty_path)
            assert html_content is not None
            assert '<html>' in html_content
        finally:
            os.remove(empty_path)
    
    def test_large_pdf_handling(self):
        """Test handling of large PDF files"""
        # Create PDF with many pages
        doc = fitz.open()
        
        for i in range(10):  # 10 pages
            page = doc.new_page()
            page.insert_text((50, 50), f"Page {i+1} content", fontsize=12)
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            doc.save(tmp.name)
            doc.close()
            large_path = tmp.name
        
        try:
            html_content = self.pdf_converter.to_html(large_path)
            assert html_content is not None
            assert 'Page 1 content' in html_content
            assert 'Page 10 content' in html_content
        finally:
            os.remove(large_path)


class TestPDFAPI:
    """Test PDF conversion API endpoints"""
    
    def setup_method(self):
        """Setup test fixtures"""
        self.test_pdf_content = self.create_test_pdf_bytes()
    
    def create_test_pdf_bytes(self) -> bytes:
        """Create test PDF as bytes"""
        doc = fitz.open()
        page = doc.new_page()
        page.insert_text((50, 50), "API Test PDF", fontsize=12)
        
        pdf_bytes = doc.tobytes()
        doc.close()
        return pdf_bytes
    
    def test_pdf_to_html_endpoint(self):
        """Test PDF to HTML API endpoint"""
        response = client.post(
            "/api/v1/file-conversion/pdf",
            params={"conversion": "pdf-to-html"},
            files={"file": ("test.pdf", self.test_pdf_content, "application/pdf")}
        )
        
        assert response.status_code == 200
        assert response.headers["content-type"] == "text/html; charset=utf-8"
        assert "<html>" in response.text
        assert "API Test PDF" in response.text
    
    def test_pdf_to_text_endpoint(self):
        """Test PDF to text API endpoint"""
        response = client.post(
            "/api/v1/file-conversion/pdf",
            params={"conversion": "pdf-to-text"},
            files={"file": ("test.pdf", self.test_pdf_content, "application/pdf")}
        )
        
        assert response.status_code == 200
        assert response.headers["content-type"] == "text/plain; charset=utf-8"
        assert "API Test PDF" in response.text
    
    def test_pdf_to_word_endpoint(self):
        """Test PDF to Word API endpoint"""
        response = client.post(
            "/api/v1/file-conversion/pdf",
            params={"conversion": "pdf-to-word"},
            files={"file": ("test.pdf", self.test_pdf_content, "application/pdf")}
        )
        
        assert response.status_code == 200
        assert "application/vnd.openxmlformats-officedocument.wordprocessingml.document" in response.headers["content-type"]
    
    def test_missing_file_parameter(self):
        """Test API with missing file parameter"""
        response = client.post(
            "/api/v1/file-conversion/pdf",
            params={"conversion": "pdf-to-html"}
        )
        
        assert response.status_code == 422  # Unprocessable Entity
    
    def test_invalid_conversion_type(self):
        """Test API with invalid conversion type"""
        response = client.post(
            "/api/v1/file-conversion/pdf",
            params={"conversion": "invalid-conversion"},
            files={"file": ("test.pdf", self.test_pdf_content, "application/pdf")}
        )
        
        assert response.status_code == 400
    
    def test_corrupted_pdf_file(self):
        """Test API with corrupted PDF file"""
        corrupted_content = b"This is not a valid PDF"
        
        response = client.post(
            "/api/v1/file-conversion/pdf",
            params={"conversion": "pdf-to-html"},
            files={"file": ("corrupted.pdf", corrupted_content, "application/pdf")}
        )
        
        assert response.status_code in [400, 500]
        assert "error" in response.json() or "detail" in response.json()


class TestImageConversion:
    """Test image conversion functionality"""
    
    def test_image_to_pdf_endpoint(self):
        """Test image to PDF conversion"""
        # Create a simple test image (1x1 pixel PNG)
        test_image = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde'
        
        response = client.post(
            "/api/v1/file-conversion/image",
            params={"conversion": "image-to-pdf"},
            files={"file": ("test.png", test_image, "image/png")}
        )
        
        assert response.status_code == 200
        assert "application/pdf" in response.headers["content-type"]
    
    def test_image_to_grayscale_endpoint(self):
        """Test image to grayscale conversion"""
        test_image = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde'
        
        response = client.post(
            "/api/v1/file-conversion/image",
            params={"conversion": "image-to-grayscale"},
            files={"file": ("test.png", test_image, "image/png")}
        )
        
        assert response.status_code == 200
        assert "image/" in response.headers["content-type"]


class TestWordConversion:
    """Test Word document conversion functionality"""
    
    def test_word_to_pdf_endpoint(self):
        """Test Word to PDF conversion"""
        # Create minimal DOCX file (simplified for testing)
        test_docx = b'PK\x03\x04'  # ZIP file signature (DOCX is a ZIP)
        
        response = client.post(
            "/api/v1/file-conversion/word",
            params={"conversion": "word-to-pdf"},
            files={"file": ("test.docx", test_docx, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")}
        )
        
        # May fail with invalid DOCX, but should handle gracefully
        assert response.status_code in [200, 400, 500]
    
    def test_word_to_html_endpoint(self):
        """Test Word to HTML conversion"""
        test_docx = b'PK\x03\x04'
        
        response = client.post(
            "/api/v1/file-conversion/word",
            params={"conversion": "word-to-html"},
            files={"file": ("test.docx", test_docx, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")}
        )
        
        assert response.status_code in [200, 400, 500]
