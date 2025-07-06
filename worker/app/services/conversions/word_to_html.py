from fastapi import UploadFile
import mammoth
from io import BytesIO

class WordToHtml:
    @staticmethod
    async def convert(file: UploadFile) -> str:
        contents = await file.read()

        with BytesIO(contents) as docx_stream:
            result = mammoth.convert_to_html(docx_stream)
            return result.value  # This is the HTML string
