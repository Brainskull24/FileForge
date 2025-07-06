from .pdf_to_html import PdfToHtml
from .word_to_html import WordToHtml
from .markdown_to_pdf import MarkdownToPdf
# Add more as needed...

converter_registry = {
    "pdf-to-html": PdfToHtml,
    "word-to-html": WordToHtml,
    "markdown-to-pdf": MarkdownToPdf,
    # Add more mappings...
}