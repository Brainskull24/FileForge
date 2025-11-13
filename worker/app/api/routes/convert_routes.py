from fastapi import APIRouter, UploadFile, File, HTTPException, Query # type: ignore
from fastapi.responses import HTMLResponse, JSONResponse, PlainTextResponse, Response, FileResponse # type: ignore
from app.services.conversions.pdfConversion import PDFConversion
from app.services.conversions.wordConversion import WordConversion
from app.services.conversions.markdownConversion import MarkdownConversion
from app.services.conversions.htmlConversion import HTMLConversion
from app.services.conversions.excelConversion import ExcelConversion
from app.services.conversions.imageConversion import ImageConversion
from app.services.db.file_metadata import save_file_metadata
import hashlib
from pathlib import Path
import tempfile
import os

router = APIRouter()

def calculate_hash(file_bytes: bytes):
    """Calculate SHA-256 hash of the uploaded file content."""
    return hashlib.sha256(file_bytes).hexdigest()

async def record_file_metadata(file: UploadFile, file_bytes: bytes):
    """Store metadata of the uploaded file in the database."""
    file_hash = calculate_hash(file_bytes)
    await save_file_metadata(
        file_name=file.filename,
        file_size=len(file_bytes),
        mime_type=file.content_type,
        file_hash=file_hash,
        metadata={}
    )

@router.post("/pdf")
async def convert_pdf(
    conversion: str = Query(..., description="Conversion type like pdf-to-html, pdf-to-word, etc."),
    file: UploadFile = File(...)
):
    """
    Convert PDF files to various formats: HTML, Word, Text, Image, or Markdown.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    file_bytes = await file.read()
    await record_file_metadata(file, file_bytes)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(file_bytes)
        temp_path = tmp.name

    converter = PDFConversion()

    try:
        if conversion == "pdf-to-html":
            html = converter.to_html(temp_path)
            return HTMLResponse(content=html)

        elif conversion == "pdf-to-word":
            docx_path = converter.to_word(temp_path)
            with open(docx_path, "rb") as f:
                content = f.read()
            os.remove(docx_path)
            return Response(content=content, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")

        elif conversion == "pdf-to-text":
            text = converter.to_text(temp_path)
            return PlainTextResponse(content=text)

        elif conversion == "pdf-to-image":
            image_paths = converter.to_image(temp_path)
            return JSONResponse(content={"images": image_paths})

        elif conversion == "pdf-to-markdown":
            markdown = converter.to_markdown(temp_path)
            return Response(content=markdown, media_type="text/markdown")

        else:
            raise HTTPException(status_code=400, detail="Invalid conversion_type.")

    finally:
        os.remove(temp_path)

@router.post("/word")
async def convert_word(
    conversion: str = Query(..., description="Conversion type like word-to-pdf, word-to-html, etc."),
    file: UploadFile = File(...)
):
    """
    Convert Word (.docx) documents to PDF, HTML, Text, or Markdown formats.
    """
    if not file.filename.lower().endswith(".docx"):
        raise HTTPException(status_code=400, detail="Only DOCX files are allowed.")

    file_bytes = await file.read()
    await record_file_metadata(file, file_bytes)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
        tmp.write(file_bytes)
        temp_path = tmp.name

    converter = WordConversion()

    try:
        if conversion == "word-to-pdf":
            output_path = converter.to_pdf(temp_path)
            if not output_path:
                raise HTTPException(status_code=500, detail="Conversion to PDF failed.")
            return FileResponse(output_path, media_type="application/pdf", filename="converted.pdf")

        elif conversion == "word-to-html":
            html = converter.to_html(temp_path)
            return HTMLResponse(content=html)

        elif conversion == "word-to-text":
            text = converter.to_text(temp_path)
            return PlainTextResponse(content=text)

        elif conversion == "word-to-markdown":
            markdown = converter.to_markdown(temp_path)
            return Response(content=markdown, media_type="text/markdown")

        else:
            raise HTTPException(status_code=400, detail="Invalid conversion_type.")

    finally:
        os.remove(temp_path)

@router.post("/markdown")
async def convert_markdown(
    conversion: str = Query(..., description="Conversion type like markdown-to-html, etc."),
    file: UploadFile = File(...)
):
    """
    Convert Markdown (.md) files to HTML, plaintext, PDF, or Word formats.
    """
    if not file.filename.lower().endswith(".md"):
        raise HTTPException(status_code=400, detail="Only Markdown (.md) files are allowed.")

    file_bytes = await file.read()
    await record_file_metadata(file, file_bytes)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".md") as tmp:
        tmp.write(file_bytes)
        temp_path = tmp.name

    converter = MarkdownConversion()

    try:
        if conversion == "markdown-to-html":
            html = converter.to_html(temp_path)
            return HTMLResponse(content=html)

        elif conversion == "markdown-to-plaintext":
            text = converter.to_plaintext(temp_path)
            return PlainTextResponse(content=text)

        elif conversion == "markdown-to-pdf":
            output_path = converter.to_pdf(temp_path)
            return FileResponse(output_path, media_type="application/pdf", filename="converted.pdf")

        elif conversion == "markdown-to-word":
            output_path = converter.to_word(temp_path)
            return FileResponse(output_path, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document", filename="converted.docx")

        else:
            raise HTTPException(status_code=400, detail="Invalid conversion_type.")

    finally:
        os.remove(temp_path)

@router.post("/html")
async def convert_html(
    conversion: str = Query(..., description="Conversion type like html-to-markdown, html-to-pdf, etc."),
    file: UploadFile = File(...)
):
    """
    Convert HTML files to Markdown, PDF, or Word formats.
    """
    if not file.filename.lower().endswith(".html"):
        raise HTTPException(status_code=400, detail="Only HTML files are allowed.")

    file_bytes = await file.read()
    await record_file_metadata(file, file_bytes)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".html", mode="wb") as tmp:
        tmp.write(file_bytes)
        temp_path = tmp.name

    converter = HTMLConversion()

    try:
        if conversion == "html-to-markdown":
            markdown = converter.to_markdown(temp_path)
            return Response(content=markdown, media_type="text/markdown")

        elif conversion == "html-to-pdf":
            pdf_path = converter.to_pdf(temp_path)
            with open(pdf_path, "rb") as f:
                content = f.read()
            os.remove(pdf_path)
            return Response(content=content, media_type="application/pdf")

        elif conversion == "html-to-word":
            word_path = converter.to_word(temp_path)
            with open(word_path, "rb") as f:
                content = f.read()
            os.remove(word_path)
            return Response(content=content, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")

        else:
            raise HTTPException(status_code=400, detail="Invalid conversion type.")
    finally:
        try:
            os.remove(temp_path)
        except Exception:
            pass  # File already deleted or doesn't exist

@router.post("/excel")
async def convert_excel(
    conversion: str = Query(..., description="excel-to-csv | excel-to-json | excel-to-pdf"),
    file: UploadFile = File(...)
):
    """
    Convert Excel files (.xls/.xlsx) to CSV, JSON, or PDF formats.
    """
    if not file.filename.lower().endswith((".xls", ".xlsx")):
        raise HTTPException(status_code=400, detail="Only Excel files are allowed.")

    file_bytes = await file.read()
    await record_file_metadata(file, file_bytes)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
        tmp.write(file_bytes)
        temp_path = tmp.name

    converter = ExcelConversion()
    try:
        if conversion == "excel-to-csv":
            csv_path = converter.to_csv(temp_path)
            with open(csv_path, "rb") as f:
                content = f.read()
            os.remove(csv_path)
            return Response(content=content, media_type="text/csv")

        elif conversion == "excel-to-json":
            json_data = converter.to_json(temp_path)
            return JSONResponse(content=json_data)

        elif conversion == "excel-to-pdf":
            pdf_path = converter.to_pdf(temp_path)
            with open(pdf_path, "rb") as f:
                content = f.read()
            os.remove(pdf_path)
            return Response(content=content, media_type="application/pdf")

        else:
            raise HTTPException(status_code=400, detail="Invalid conversion_type")

    finally:
        try:
            os.remove(temp_path)
        except Exception:
            pass  # File already deleted or doesn't exist

@router.post("/image")
async def convert_image(
    conversion: str = Query(..., description="image-to-pdf | image-to-grayscale | image-to-jpg | image-to-png"),
    file: UploadFile = File(...)
):
    """
    Convert image files (JPG, PNG, BMP, TIFF, etc.) to PDF, grayscale, or another image format.
    """
    if not file.filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".webp")):
        raise HTTPException(status_code=400, detail="Only image files are supported.")

    file_bytes = await file.read()
    await record_file_metadata(file, file_bytes)

    with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename).suffix) as tmp:
        tmp.write(file_bytes)
        temp_path = tmp.name

    converter = ImageConversion()

    try:
        if conversion == "image-to-pdf":
            output_path = converter.to_pdf(temp_path)
            return FileResponse(output_path, media_type="application/pdf", filename="converted.pdf")

        elif conversion == "image-to-grayscale":
            output_path = converter.to_grayscale(temp_path)
            return FileResponse(output_path, media_type="image/png", filename="grayscale.png")

        elif conversion.startswith("image-to-"):
            target = conversion.replace("image-to-", "")
            output_path = converter.convert_format(temp_path, target)
            return FileResponse(output_path, filename=f"converted.{target}")

        raise HTTPException(status_code=400, detail="Unsupported image conversion type.")
    finally:
        try:
            os.remove(temp_path)
        except Exception:
            pass  # File already deleted or doesn't exist
