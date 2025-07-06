# worker/app/services/conversions/pdf_to_csv.py
import pdfplumber
import tempfile
import os


class PdfToCsv:
    def __init__(self, file_name: str, file_content: bytes):
        self.file_name = file_name
        self.file_content = file_content

    def convert(self):
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
                tmp.write(self.file_content)
                tmp_pdf_path = tmp.name

            csv_content = ""
            with pdfplumber.open(tmp_pdf_path) as pdf:
                for page in pdf.pages:
                    tables = page.extract_tables()
                    for table in tables:
                        for row in table:
                            csv_content += ",".join(cell or "" for cell in row) + "\n"

            os.remove(tmp_pdf_path)

            if not csv_content.strip():
                return False, "No tables found in PDF to convert to CSV."

            return True, csv_content

        except Exception as e:
            return False, f"Conversion failed: {str(e)}"
