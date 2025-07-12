import { Request, Response } from "express";
import fs from "fs";
import { PDFDocument } from "pdf-lib";

export const mergePDFs = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length < 2) {
      res.status(400).json({ error: "At least two PDF files are required" });
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();

    // Optional: Delete temp files
    files.forEach((file) => fs.unlinkSync(file.path));

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=merged.pdf");
    res.send(Buffer.from(mergedBytes));
  } catch (err) {
    console.error("Merge error:", err);
    res.status(500).json({ error: "Failed to merge PDFs" });
  }
};
