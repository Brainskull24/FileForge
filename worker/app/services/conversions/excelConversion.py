import os
import pandas as pd
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import datetime
from app.config.db import MongoDB

class ExcelConversion:
    """
    A service class to handle conversions from Excel files to various formats:
    CSV, JSON, and PDF.

    This class uses:
    - `pandas` for reading and processing Excel data.
    - `reportlab` for generating PDF documents.
    - `MongoDB` for logging file conversion metadata.

    Attributes:
        db: MongoDB database connection used to store logs.
    """

    def __init__(self):
        """
        Initialize the ExcelConversion instance and establish a MongoDB connection.
        """
        self.db = MongoDB.get_db()

    def _log_to_db(self, file_path: str, conversion: str, output_type: str):
        """
        Internal method to log file conversion metadata to MongoDB.

        Args:
            file_path (str): The path of the original input Excel file.
            conversion (str): The type of conversion performed (e.g., "excel-to-pdf").
            output_type (str): The output file format (e.g., "pdf").
        """
        self.db["fileInfo"].insert_one({
            "file_name": os.path.basename(file_path),
            "conversion_type": conversion,
            "output_type": output_type,
            "timestamp": datetime.utcnow()
        })

    def to_csv(self, file_path: str) -> str:
        """
        Convert an Excel file to CSV format.

        Args:
            file_path (str): The full path to the input Excel (.xls/.xlsx) file.

        Returns:
            str: Path to the generated CSV file.
        """
        df = pd.read_excel(file_path)
        output_path = str(Path(file_path).with_suffix(".csv"))
        df.to_csv(output_path, index=False)
        self._log_to_db(file_path, "excel-to-csv", "csv")
        return output_path

    def to_json(self, file_path: str) -> list:
        """
        Convert an Excel file to a list of JSON objects (records).

        Args:
            file_path (str): The full path to the input Excel (.xls/.xlsx) file.

        Returns:
            list: A list of dictionaries representing rows in the Excel sheet.
        """
        df = pd.read_excel(file_path)
        json_data = df.to_dict(orient="records")
        self._log_to_db(file_path, "excel-to-json", "json")
        return json_data

    def to_pdf(self, file_path: str) -> str:
        """
        Convert an Excel file to a simple text-based PDF using ReportLab.

        The PDF is generated with column headers and row data.
        Long rows are truncated and paginated if necessary.

        Args:
            file_path (str): The full path to the input Excel (.xls/.xlsx) file.

        Returns:
            str: Path to the generated PDF file.
        """
        df = pd.read_excel(file_path)
        output_path = str(Path(file_path).with_suffix(".pdf"))
        c = canvas.Canvas(output_path, pagesize=letter)
        width, height = letter

        y = height - 40
        for col in df.columns:
            c.drawString(40, y, col)
            y -= 15

        y -= 10
        for index, row in df.iterrows():
            line = ', '.join(str(x) for x in row)
            if y <= 40:
                c.showPage()
                y = height - 40
            c.drawString(40, y, line[:100])  
            y -= 15

        c.save()
        self._log_to_db(file_path, "excel-to-pdf", "pdf")
        return output_path
