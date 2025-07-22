from fastapi import UploadFile

async def read_file_content(file: UploadFile) -> bytes:
    return await file.read()