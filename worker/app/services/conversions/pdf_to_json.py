import pdfplumber
import io

class PdfToJson:
    def __init__(self, file_name: str, file_content: bytes):
        self.file_name = file_name
        self.file_content = file_content

    def convert(self):
        try:
            result = []
            with pdfplumber.open(io.BytesIO(self.file_content)) as pdf:
                for i, page in enumerate(pdf.pages):
                    result.append({
                        "page": i + 1,
                        "text": page.extract_text()
                    })
            return True, result
        except Exception as e:
            return False, str(e)
