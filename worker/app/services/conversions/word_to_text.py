from fastapi import UploadFile
from docx import Document
from tempfile import NamedTemporaryFile

class WordToText:
    @staticmethod
    async def convert(file: UploadFile) -> str:
        contents = await file.read()
        with NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
            tmp.write(contents)
            tmp.flush()
            doc = Document(tmp.name)
            return "\n".join([p.text for p in doc.paragraphs])
