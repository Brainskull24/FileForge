import fitz  # PyMuPDF
import base64

class PdfToImage:
    def __init__(self, file_name: str, file_content: bytes):
        self.file_name = file_name
        self.file_content = file_content

    def convert(self):
        try:
            doc = fitz.open(stream=self.file_content, filetype="pdf")
            images = []

            for page in doc:
                pix = page.get_pixmap(dpi=150)
                img_bytes = pix.tobytes("png")
                img_base64 = base64.b64encode(img_bytes).decode("utf-8")
                images.append(f"data:image/png;base64,{img_base64}")

            return True, images
        except Exception as e:
            return False, str(e)
