import os
from PIL import Image
from pathlib import Path
from datetime import datetime
import pytesseract
from app.config.db import MongoDB


class ImageConversion:
    """
    A service class to perform conversions on image files to various formats
    such as PDF, grayscale, and other image formats.

    Supported conversions:
    - Image to PDF
    - Image to Grayscale (PNG)
    - Image format conversions (JPEG, PNG, BMP, TIFF, WEBP)
    - (Optional future): Image to Text via OCR

    Attributes:
        db: MongoDB database connection used for logging file metadata.
    """

    def __init__(self):
        """
        Initialize the ImageConversion instance and connect to MongoDB.
        """
        self.db = MongoDB.get_db()

    def _log_to_db(self, file_path: str, conversion: str, output_type: str):
        """
        Internal method to log file conversion metadata to MongoDB.

        Args:
            file_path (str): The original input file path.
            conversion (str): The conversion type performed (e.g., 'image-to-pdf').
            output_type (str): The resulting file type (e.g., 'pdf', 'image').
        """
        self.db["fileInfo"].insert_one({
            "file_name": os.path.basename(file_path),
            "conversion_type": conversion,
            "output_type": output_type,
            "timestamp": datetime.utcnow()
        })

    def to_pdf(self, file_path: str) -> str:
        """
        Convert an image file to a PDF.

        Args:
            file_path (str): The path to the input image file.

        Returns:
            str: The path to the output PDF file.
        """
        output_path = str(Path(file_path).with_suffix('.pdf'))
        image = Image.open(file_path)
        image.convert("RGB").save(output_path, "PDF")
        self._log_to_db(file_path, "image-to-pdf", "pdf")
        return output_path

    def to_grayscale(self, file_path: str) -> str:
        """
        Convert an image to grayscale and save it as PNG.

        Args:
            file_path (str): The path to the input image file.

        Returns:
            str: The path to the grayscale output image file.
        """
        output_path = str(Path(file_path).with_name(f"{Path(file_path).stem}_gray.png"))
        image = Image.open(file_path).convert("L")  # 'L' mode for grayscale
        image.save(output_path)
        self._log_to_db(file_path, "image-to-grayscale", "image")
        return output_path

    def convert_format(self, file_path: str, output_format: str) -> str:
        """
        Convert an image from one format to another (e.g., JPG to PNG).

        Args:
            file_path (str): The path to the input image file.
            output_format (str): The desired output format ('jpg', 'png', 'webp', etc.)

        Returns:
            str: The path to the output converted image file.

        Raises:
            ValueError: If the output format is not supported.
        """
        format_map = {
            "jpg": "JPEG",
            "jpeg": "JPEG",
            "png": "PNG",
            "webp": "WEBP",
            "bmp": "BMP",
            "tiff": "TIFF"
        }

        if output_format.lower() not in format_map:
            raise ValueError(f"Unsupported output format: {output_format}")

        save_format = format_map[output_format.lower()]
        output_path = str(Path(file_path).with_suffix(f".{output_format.lower()}"))

        with Image.open(file_path) as img:
            img = img.convert("RGB")  # ensures compatibility
            img.save(output_path, save_format)

        self._log_to_db(file_path, f"image-to-{output_format.lower()}", output_format.lower())
        return output_path
