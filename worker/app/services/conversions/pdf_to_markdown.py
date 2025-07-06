import os
import tempfile
from pymupdf4llm import to_markdown

class PdfToMarkdown:
    def __init__(self, file_name: str, file_content: bytes, return_directly: bool = False):
        self.file_name = file_name
        self.file_content = file_content
        self.return_directly = return_directly

    def convert(self):
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
                tmp_file.write(self.file_content)
                tmp_pdf_path = tmp_file.name

            markdown_text = to_markdown(tmp_pdf_path)

            if self.return_directly:
                return True, markdown_text

            output_dir = os.path.join(os.path.dirname(__file__), "../../outputfiles")
            os.makedirs(output_dir, exist_ok=True)

            md_file_path = os.path.join(output_dir, f"{os.path.splitext(self.file_name)[0]}.md")
            with open(md_file_path, "w", encoding="utf-8") as md_file:
                md_file.write(markdown_text)

            return True, md_file_path

        except Exception as e:
            return False, f"Conversion failed: {str(e)}"
