import os
from datetime import datetime, timezone
from pathlib import Path
from markdownify import markdownify as md_convert
from bs4 import BeautifulSoup
from docx import Document
from xhtml2pdf import pisa

from app.config.db import MongoDB


class HTMLConversion:
    """
    A service class to handle conversions from HTML files to various formats:
    Markdown (.md), PDF (.pdf), and Word (.docx).

    This class uses:
    - `markdownify` for HTML to Markdown conversion.
    - `xhtml2pdf` for rendering PDFs from HTML content.
    - `python-docx` and `BeautifulSoup` for generating Word documents from HTML.
    - MongoDB for logging file conversion metadata.

    Attributes:
        db: MongoDB database connection used to store logs.
    """

    def __init__(self):
        """
        Initialize the HTMLConversion instance and connect to MongoDB.
        """
        self.db = MongoDB.get_db()

    def _log_to_db(self, file_path: str, conversion: str, output_type: str):
        """
        Internal method to log file conversion metadata to MongoDB.

        Args:
            file_path (str): The path of the original input HTML file.
            conversion (str): The type of conversion performed (e.g., "html-to-pdf").
            output_type (str): The output file format (e.g., "pdf").
        """
        self.db["fileInfo"].insert_one({
            "file_name": os.path.basename(file_path),
            "conversion_type": conversion,
            "output_type": output_type,
            "timestamp": datetime.now(timezone.utc)
        })

    def to_markdown(self, file_path: str) -> str:
        """
        Convert an HTML file to Markdown (.md) format.

        Args:
            file_path (str): The path to the input HTML file.

        Returns:
            str: A string containing the converted Markdown content.
        """
        with open(file_path, "r", encoding="utf-8") as f:
            html = f.read()
        markdown = md_convert(html, heading_style="ATX")
        self._log_to_db(file_path, "html-to-markdown", "md")
        return markdown

    def to_pdf(self, file_path: str) -> str:
        """
        Convert an HTML file to PDF (.pdf) format using xhtml2pdf.

        Args:
            file_path (str): The path to the input HTML file.

        Returns:
            str: Path to the generated PDF file.
        """
        with open(file_path, "r", encoding="utf-8") as f:
            html = f.read()
        output_path = str(Path(file_path).with_suffix(".pdf"))
        with open(output_path, "wb") as pdf_file:
            pisa.CreatePDF(src=html, dest=pdf_file)
        self._log_to_db(file_path, "html-to-pdf", "pdf")
        return output_path

    def to_word(self, file_path: str) -> str:
        """
        Convert an HTML file to Word (.docx) format.

        Extracts paragraph and heading tags using BeautifulSoup,
        and writes them into a Word document using python-docx.

        Args:
            file_path (str): The path to the input HTML file.

        Returns:
            str: Path to the generated Word (.docx) file.
        """
        with open(file_path, "r", encoding="utf-8") as f:
            html = f.read()
        soup = BeautifulSoup(html, "html.parser")
        document = Document()
        for para in soup.find_all(["p", "h1", "h2", "h3", "h4", "h5", "h6"]):
            document.add_paragraph(para.get_text())
        output_path = str(Path(file_path).with_suffix(".docx"))
        document.save(output_path)
        self._log_to_db(file_path, "html-to-word", "docx")
        return output_path
