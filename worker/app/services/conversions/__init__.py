from .pdf_to_html import PdfToHtml
# import other converters...

converter_registry = {
    "pdf-to-html": PdfToHtml,
    # Add others as needed...
}
