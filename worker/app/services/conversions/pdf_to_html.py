import fitz 
import os
import base64
import tempfile


class PdfToHtml:
    def __init__(self, file_name: str, file_content: bytes, return_directly: bool = False):
        self.file_name = file_name
        self.file_content = file_content
        self.return_directly = return_directly

    def convert(self):
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
                tmp_file.write(self.file_content)
                tmp_pdf_path = tmp_file.name

            doc = fitz.open(tmp_pdf_path)
            html_parts = []

            for page in doc:
                html = page.get_text("html")
                html_parts.append(html)

            full_html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>{self.file_name}</title>
            </head>
            <body>
                {''.join(html_parts)}
            </body>
            </html>
            """

            doc.close()
            os.remove(tmp_pdf_path)

            if self.return_directly:
                return True, full_html

            output_dir = os.path.join(os.path.dirname(__file__), "../../outputfiles")
            os.makedirs(output_dir, exist_ok=True)

            html_file_path = os.path.join(output_dir, f"{os.path.splitext(self.file_name)[0]}.html")
            with open(html_file_path, "w", encoding="utf-8") as html_file:
                html_file.write(full_html)

            with open(html_file_path, "rb") as html_file:
                encoded = base64.b64encode(html_file.read()).decode("utf-8")

            return True, encoded

        except Exception as e:
            return False, f"Conversion failed: {str(e)}"
