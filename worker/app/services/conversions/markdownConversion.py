import os
from datetime import datetime, timezone
from pathlib import Path
from bs4 import BeautifulSoup
import markdown2
from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
from docx import Document

from app.config.db import MongoDB


class MarkdownConversion:
    """
    A service class to handle conversions of Markdown (.md) files into various formats.

    Supported conversions:
    - Markdown to HTML
    - Markdown to Plain Text
    - Markdown to PDF
    - Markdown to Word (DOCX)

    Attributes:
        db: MongoDB connection object for logging file metadata.
    """

    def __init__(self):
        """
        Initializes the MarkdownConversion service and establishes a database connection.
        """
        self.db = MongoDB.get_db()

    def _log_to_db(self, file_path: str, conversion: str, output_type: str):
        """
        Internal utility to log conversion details into the MongoDB collection.

        Args:
            file_path (str): Path to the original file.
            conversion (str): The type of conversion performed.
            output_type (str): The resulting output file format.
        """
        self.db["fileInfo"].insert_one({
            "file_name": os.path.basename(file_path),
            "conversion_type": conversion,
            "output_type": output_type,
            "timestamp": datetime.now(timezone.utc)
        })

    def to_html(self, file_path: str) -> str:
        """
        Converts a Markdown file to HTML format.

        Args:
            file_path (str): Path to the Markdown (.md) file.

        Returns:
            str: HTML string representing the converted content.
        """
        with open(file_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        html = markdown2.markdown(md_content)
        self._log_to_db(file_path, "markdown-to-html", "html")
        return html

    def to_plaintext(self, file_path: str) -> str:
        """
        Converts a Markdown file to plain text by stripping HTML tags.

        Args:
            file_path (str): Path to the Markdown (.md) file.

        Returns:
            str: Plain text string with all formatting removed.
        """
        with open(file_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        html = markdown2.markdown(md_content)
        soup = BeautifulSoup(html, 'html.parser')
        text = soup.get_text()
        self._log_to_db(file_path, "markdown-to-plaintext", "txt")
        return text

    def to_pdf(self, file_path: str) -> str:
        """
        Converts a Markdown file to PDF using ReportLab.

        Args:
            file_path (str): Path to the Markdown (.md) file.

        Returns:
            str: File path to the generated PDF.
        """
        output_path = str(Path(file_path).with_suffix('.pdf'))

        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        c = canvas.Canvas(output_path, pagesize=LETTER)
        width, height = LETTER
        y = height - 50

        for line in lines:
            if y <= 50:
                c.showPage()
                y = height - 50
            c.drawString(50, y, line.strip())
            y -= 15

        c.save()
        self._log_to_db(file_path, "markdown-to-pdf", "pdf")
        return output_path

    def to_word(self, file_path: str) -> str:
        """
        Converts a Markdown file to Word (.docx) format.

        Args:
            file_path (str): Path to the Markdown (.md) file.

        Returns:
            str: File path to the generated DOCX file.
        """
        output_path = str(Path(file_path).with_suffix('.docx'))
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        doc = Document()
        for line in content.split('\n'):
            doc.add_paragraph(line)
        doc.save(output_path)
        self._log_to_db(file_path, "markdown-to-word", "docx")
        return output_path
