from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from fastapi.responses import HTMLResponse, JSONResponse, PlainTextResponse, Response
from app.services.conversions.pdf_to_html import PdfToHtml
from app.services.conversions.pdf_to_word import PdfToWord
from app.services.conversions.pdf_to_text import PdfToText
from app.services.conversions.pdf_to_image import PdfToImage
from app.services.conversions.pdf_to_json import PdfToJson
from app.services.conversions.pdf_to_csv import PdfToCsv
from app.services.conversions.pdf_to_markdown import PdfToMarkdown
from app.services.conversions.word_to_pdf import WordToPdf
from app.services.conversions.word_to_html import WordToHtml
from app.services.conversions.word_to_text import WordToText
from app.services.conversions.word_to_markdown import WordToMarkdown

router = APIRouter()

@router.post("/pdf")
async def convert_pdf(
    conversion: str = Query(..., description="Conversion type like pdf-to-html, pdf-to-word, etc."),
    file: UploadFile = File(...)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    file_bytes = await file.read()

    if conversion == "pdf-to-html":
        converter = PdfToHtml(file_name=file.filename, file_content=file_bytes, return_directly=True)
        success, result = converter.convert()
        if success:
            return HTMLResponse(content=result)

    elif conversion == "pdf-to-word":
        converter = PdfToWord(file_name=file.filename, file_content=file_bytes, return_directly=True)
        success, result = converter.convert()
        if success:
            return Response(content=result, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")

    elif conversion == "pdf-to-text":
        converter = PdfToText(file_name=file.filename, file_content=file_bytes)
        success, result = converter.convert()
        if success:
            return PlainTextResponse(content=result)

    elif conversion == "pdf-to-image":
        converter = PdfToImage(file_name=file.filename, file_content=file_bytes)
        success, result = converter.convert()
        if success:
            return JSONResponse(content={"images": result})

    elif conversion == "pdf-to-json":
        converter = PdfToJson(file_name=file.filename, file_content=file_bytes)
        success, result = converter.convert()
        if success:
            return JSONResponse(content=result)

    elif conversion == "pdf-to-csv":
        converter = PdfToCsv(file_name=file.filename, file_content=file_bytes)
        success, result = converter.convert()
        if not success:
            raise HTTPException(status_code=404, detail=result)
        return PlainTextResponse(content=result)

    elif conversion == "pdf-to-markdown":
        converter = PdfToMarkdown(file_name=file.filename, file_content=file_bytes, return_directly=True)
        success, result = converter.convert()
        if not success:
            raise HTTPException(status_code=500, detail=result)
        return Response(content=result, media_type="text/markdown")

    else:
        raise HTTPException(status_code=400, detail="Invalid conversion_type.")
    

@router.post("/word")
async def convert_word(
    conversion: str = Query(..., description="Conversion type like word-to-pdf, word-to-html, etc."),
    file: UploadFile = File(...)
):
    if not file.filename.lower().endswith(".docx"):
        raise HTTPException(status_code=400, detail="Only DOCX files are allowed.")

    if conversion == "word-to-pdf":
        converter = WordToPdf()
        result = await converter.convert(file)
        return Response(content=result, media_type="application/pdf")

    elif conversion == "word-to-html":
        converter = WordToHtml()
        result = await converter.convert(file)
        return HTMLResponse(content=result, media_type="text/html")

    elif conversion == "word-to-text":
        converter = WordToText()
        result = await converter.convert(file)
        return PlainTextResponse(content=result)

    elif conversion == "word-to-markdown":
        converter = WordToMarkdown()
        result = await converter.convert(file)
        return Response(content=result, media_type="text/markdown")

    else:
        raise HTTPException(status_code=400, detail="Invalid conversion_type.")

