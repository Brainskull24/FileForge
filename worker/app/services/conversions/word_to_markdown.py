from fastapi import UploadFile
import pypandoc
from tempfile import NamedTemporaryFile

class WordToMarkdown:
    @staticmethod
    async def convert(file: UploadFile) -> str:
        contents = await file.read()

        # Save DOCX temporarily
        with NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
            tmp.write(contents)
            tmp.flush()
            input_path = tmp.name

        try:
            # Ensure pandoc is downloaded
            pypandoc.download_pandoc()

            # Convert DOCX → Markdown
            output = pypandoc.convert_file(input_path, 'md')
            return output
        except Exception as e:
            raise RuntimeError(f"Word to Markdown conversion failed: {e}")
