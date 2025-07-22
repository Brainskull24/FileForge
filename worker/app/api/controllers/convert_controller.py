from fastapi import UploadFile
from app.utils.file_helpers import read_file_content
from app.services.conversions import converter_registry
from app.schemas.convert_schema import ConvertResponse
import os

async def handle_conversion(conversion_type: str, file: UploadFile, return_directly: bool = False) -> ConvertResponse:
    file_content = await read_file_content(file)
    converter_class = converter_registry.get(conversion_type)

    if not converter_class:
        return ConvertResponse(success=False, content=f"Unsupported conversion type: {conversion_type}")

    converter = converter_class(file.filename, file_content, return_directly)
    success, result = converter.convert()

    return ConvertResponse(success=success, content=result)