import os
import tempfile
import base64
from pdf2docx import Converter


class PdfToWord:
    def __init__(self, file_name: str, file_content: bytes, return_directly: bool = False):
        self.file_name = file_name
        self.file_content = file_content
        self.return_directly = return_directly

    def convert(self):
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
                tmp_file.write(self.file_content)
                tmp_pdf_path = tmp_file.name

            word_output_path = tmp_pdf_path.replace(".pdf", ".docx")

            converter = Converter(tmp_pdf_path)
            converter.convert(word_output_path, start=0, end=None)
            converter.close()

            if self.return_directly:
                with open(word_output_path, "rb") as word_file:
                    word_data = word_file.read()
                os.remove(tmp_pdf_path)
                os.remove(word_output_path)
                return True, word_data

            output_dir = os.path.join(os.path.dirname(__file__), "../../../outputfiles")
            os.makedirs(output_dir, exist_ok=True)

            final_path = os.path.join(output_dir, f"{os.path.splitext(self.file_name)[0]}.docx")
            os.replace(word_output_path, final_path)

            with open(final_path, "rb") as docx_file:
                encoded = base64.b64encode(docx_file.read()).decode("utf-8")

            os.remove(tmp_pdf_path)
            return True, encoded

        except Exception as e:
            return False, f"Conversion failed: {str(e)}"
