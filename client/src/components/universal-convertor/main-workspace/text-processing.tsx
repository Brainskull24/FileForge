"use client";

import { Base64Utils } from "./base64-utils";
import { EncodingUtils } from "./encoding-utils";
import { HashUtils } from "./hash-utils";

interface ProcessingResult {
  type: "text" | "file";
  content?: string;
  blob?: Blob;
  filename?: string;
}

export class TextProcessingLogic {
  static async processText(
    selectedTool: string,
    inputText: string
  ): Promise<ProcessingResult> {
    switch (selectedTool) {
      // Base64 operations
      case "base64-encode":
        return { type: "text", content: Base64Utils.encode(inputText) };

      case "base64-decode":
        return { type: "text", content: Base64Utils.decode(inputText) };

      case "base64-to-image":
        return Base64Utils.toImage(inputText);

      case "base64-to-file":
        return Base64Utils.toFile(inputText);

      case "base64-to-pdf":
        return Base64Utils.toPdf(inputText);

      // Base32 operations
      case "base32-encode":
        return { type: "text", content: Base64Utils.base32Encode(inputText) };

      case "base32-decode":
        return { type: "text", content: Base64Utils.base32Decode(inputText) };

      // URL operations
      case "url-encode":
        return { type: "text", content: EncodingUtils.urlEncode(inputText) };

      case "url-decode":
        return { type: "text", content: EncodingUtils.urlDecode(inputText) };

      // HTML operations
      case "html-encode":
        return { type: "text", content: EncodingUtils.htmlEncode(inputText) };

      case "html-decode":
        return { type: "text", content: EncodingUtils.htmlDecode(inputText) };

      // Hex operations
      case "hex-encode":
        return { type: "text", content: EncodingUtils.hexEncode(inputText) };

      case "hex-decode":
        return { type: "text", content: EncodingUtils.hexDecode(inputText) };

      // Binary operations
      case "binary-encode":
        return { type: "text", content: EncodingUtils.binaryEncode(inputText) };

      case "binary-decode":
        return { type: "text", content: EncodingUtils.binaryDecode(inputText) };

      // Hash operations
      case "hash-md5":
        return { type: "text", content: HashUtils.md5(inputText) };

      case "hash-sha256":
        return { type: "text", content: HashUtils.sha256(inputText) };

      // JWT operations
      case "jwt-decode":
        return { type: "text", content: EncodingUtils.jwtDecode(inputText) };

      // JSON operations
      case "json-decode":
        return { type: "text", content: EncodingUtils.jsonFormat(inputText) };

      case "unicode-encode":
        return {
          type: "text",
          content: EncodingUtils.unicodeEncode(inputText),
        };

      case "unicode-decode":
        return {
          type: "text",
          content: EncodingUtils.unicodeDecode(inputText),
        };

      case "xml-decode": {
        const decoded = await EncodingUtils.xmlDecode(inputText);
        return { type: "text", content: decoded };
      }

      case "qr-generate": {
        const base64 = await EncodingUtils.qrGenerate(inputText);
        const blob = await (await fetch(base64)).blob();
        return {
          type: "file",
          blob,
          filename: "qr-code.png",
        };
      }

      // File encoding tools (these redirect to file processor)
      case "file-to-base64":
      case "image-to-base64":
      case "pdf-to-base64":
      case "file-to-base32":
      case "file-to-hex":
      case "file-to-binary":
        return {
          type: "text",
          content: "Please use the file upload section for file encoding",
        };

      default:
        return { type: "text", content: `Processed: ${inputText}` };
    }
  }
}
