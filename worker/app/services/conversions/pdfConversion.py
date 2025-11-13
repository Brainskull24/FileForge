import os
from datetime import datetime, timezone
from typing import List
from pathlib import Path

import fitz  # PyMuPDF
import base64
import markdownify
import pdfplumber
from pdf2docx import Converter

from app.config.db import MongoDB


class PDFConversion:
    """
    A service class to handle conversions from PDF files to various formats.

    Supported conversions:
    - PDF to HTML
    - PDF to Word (DOCX)
    - PDF to Plain Text
    - PDF to Image (as base64-encoded PNGs)
    - PDF to Markdown

    Attributes:
        db: MongoDB connection object for logging file conversion metadata.
    """

    def __init__(self):
        """
        Initializes the PDFConversion service and sets up MongoDB connection.
        """
        self.db = MongoDB.get_db()

    def _log_to_db(self, file_path: str, conversion: str, output_type: str):
        """
        Logs metadata about the file conversion into MongoDB.

        Args:
            file_path (str): The full path to the original PDF file.
            conversion (str): Type of conversion performed (e.g. 'pdf-to-html').
            output_type (str): Resulting file type (e.g. 'html', 'docx').
        """
        self.db["fileInfo"].insert_one({
            "file_name": os.path.basename(file_path),
            "conversion_type": conversion,
            "output_type": output_type,
            "timestamp": datetime.now(timezone.utc)
        })

    def to_html(self, file_path: str) -> str:
        """
        Converts a PDF file into an HTML string representation.

        Args:
            file_path (str): Path to the input PDF file.

        Returns:
            str: An HTML string containing content of all PDF pages.
        """
        doc = fitz.open(file_path)
        html_output = "<html><body>"

        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            html = page.get_text("html")
            html_output += f"<div>{html}</div><hr>"

        html_output += "</body></html>"
        self._log_to_db(file_path, "pdf-to-html", "html")
        return html_output

    def to_word(self, file_path: str) -> str:
        """
        Converts a PDF file to a Word (.docx) file using pdf2docx.

        Args:
            file_path (str): Path to the input PDF file.

        Returns:
            str: Path to the generated .docx file.
        """
        output_path = str(Path(file_path).with_suffix('.docx'))
        cv = Converter(file_path)
        cv.convert(output_path, start=0, end=None)
        cv.close()
        self._log_to_db(file_path, "pdf-to-word", "docx")
        return output_path

    def to_text(self, file_path: str) -> str:
        """
        Extracts plain text from a PDF file using pdfplumber.

        Args:
            file_path (str): Path to the input PDF file.

        Returns:
            str: A plain text string of the PDF content.
        """
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        self._log_to_db(file_path, "pdf-to-text", "txt")
        return text.strip()

    def to_image(self, file_path: str) -> List[str]:
        """
        Converts each page of a PDF to a base64-encoded PNG image.

        Args:
            file_path (str): Path to the input PDF file.

        Returns:
            List[str]: A list of base64-encoded PNG images in data URI format.
        """
        doc = fitz.open(file_path)
        image_base64_list = []

        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            pix = page.get_pixmap(dpi=200)

            image_bytes = pix.tobytes("png")
            base64_image = base64.b64encode(image_bytes).decode("utf-8")

            image_base64_list.append(f"data:image/png;base64,{base64_image}")

        self._log_to_db(file_path, "pdf-to-image", "base64")
        return image_base64_list

    def to_markdown(self, file_path: str) -> str:
        """
        Converts a PDF file to Markdown by first converting it to HTML.

        Args:
            file_path (str): Path to the input PDF file.

        Returns:
            str: A Markdown string representing the content of the PDF.
        """
        html = self.to_html(file_path)
        markdown = markdownify.markdownify(html, heading_style="ATX")
        self._log_to_db(file_path, "pdf-to-markdown", "md")
        return markdown
