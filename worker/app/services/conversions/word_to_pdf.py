import aspose.words as aw
from fastapi import UploadFile
from tempfile import NamedTemporaryFile
from io import BytesIO

class WordToPdf:
    @staticmethod
    async def convert(file: UploadFile) -> bytes:
        contents = await file.read()

        # Save input .docx file temporarily
        with NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
            tmp.write(contents)
            tmp.flush()
            input_path = tmp.name

        # Load and convert DOCX → PDF in memory using BytesIO
        try:
            doc = aw.Document(input_path)
            pdf_stream = BytesIO()
            doc.save(pdf_stream, aw.SaveFormat.PDF)
            return pdf_stream.getvalue()
        except Exception as e:
            raise RuntimeError(f"Word to PDF conversion failed: {e}")
