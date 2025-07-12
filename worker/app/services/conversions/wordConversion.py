import os
from datetime import datetime
from typing import Optional
from pathlib import Path

import mammoth
import pypandoc
from docx import Document
from comtypes.client import CreateObject

from app.config.db import MongoDB

class WordConversion:
    """
    A utility class for converting DOCX (Word) files to various formats,
    including PDF, HTML, plain text, and Markdown. All conversions are
    logged into the MongoDB collection 'fileInfo'.
    """

    def __init__(self):
        """
        Initializes the MongoDB connection to use for logging.
        """
        self.db = MongoDB.get_db()

    def _log_to_db(self, file_path: str, conversion: str, output_type: str):
        """
        Logs the conversion metadata into MongoDB.

        Args:
            file_path (str): The original file path.
            conversion (str): Conversion type, e.g., 'word-to-pdf'.
            output_type (str): Output format, e.g., 'pdf'.
        """
        self.db["fileInfo"].insert_one({
            "file_name": os.path.basename(file_path),
            "conversion_type": conversion,
            "output_type": output_type,
            "timestamp": datetime.utcnow()
        })

    def to_pdf(self, file_path: str) -> Optional[str]:
        """
        Converts a DOCX file to PDF using the Word COM automation (Windows only).

        Args:
            file_path (str): Path to the input DOCX file.

        Returns:
            Optional[str]: Path to the output PDF file, or None if failed.
        """
        try:
            word = CreateObject("Word.Application")
            word.Visible = False
            doc = word.Documents.Open(file_path)
            output_path = str(Path(file_path).with_suffix(".pdf"))
            doc.SaveAs(output_path, FileFormat=17)  # 17 = wdFormatPDF
            doc.Close()
            word.Quit()
            self._log_to_db(file_path, "word-to-pdf", "pdf")
            return output_path
        except Exception as e:
            return None

    def to_html(self, file_path: str) -> str:
        """
        Converts a DOCX file to HTML using the 'mammoth' library.

        Args:
            file_path (str): Path to the input DOCX file.

        Returns:
            str: HTML string.
        """
        with open(file_path, "rb") as docx_file:
            result = mammoth.convert_to_html(docx_file)
        self._log_to_db(file_path, "word-to-html", "html")
        return result.value

    def to_text(self, file_path: str) -> str:
        """
        Extracts plain text from a DOCX file.

        Args:
            file_path (str): Path to the input DOCX file.

        Returns:
            str: Extracted plain text.
        """
        text = ""
        doc = Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"
        self._log_to_db(file_path, "word-to-text", "txt")
        return text.strip()

    def to_markdown(self, file_path: str) -> str:
        """
        Converts a DOCX file to Markdown using Pandoc.

        Args:
            file_path (str): Path to the input DOCX file.

        Returns:
            str: Markdown-formatted string, or error message if failed.
        """
        try:
            markdown = pypandoc.convert_file(file_path, 'md', format='docx')
            self._log_to_db(file_path, "word-to-markdown", "md")
            return markdown
        except Exception as e:
            return f"Error during conversion: {str(e)}"
