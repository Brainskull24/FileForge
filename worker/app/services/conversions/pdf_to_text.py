import fitz  # PyMuPDF

class PdfToText:
    def __init__(self, file_name: str, file_content: bytes):
        self.file_name = file_name
        self.file_content = file_content

    def convert(self):
        try:
            doc = fitz.open(stream=self.file_content, filetype="pdf")
            text = "\n".join(page.get_text() for page in doc)
            return True, text
        except Exception as e:
            return False, str(e)
