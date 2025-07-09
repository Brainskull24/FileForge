"use client"
import QRCode from "qrcode"
import { parseStringPromise } from "xml2js"
export class EncodingUtils {
  static urlEncode(text: string): string {
    try {
      return encodeURIComponent(text)
    } catch {
      return "Error encoding URL"
    }
  }

  static urlDecode(text: string): string {
    try {
      return decodeURIComponent(text)
    } catch {
      return "Invalid URL-encoded input"
    }
  }

  static htmlEncode(text: string): string {
    return text.replace(
      /[&<>"']/g,
      (match) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[match] || match,
    )
  }

  static htmlDecode(text: string): string {
    const textarea = document.createElement("textarea")
    textarea.innerHTML = text
    return textarea.value
  }

  static hexEncode(text: string): string {
    return [...text].map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")
  }

  static hexDecode(text: string): string {
    try {
      return text
        .split(" ")
        .map((hex) => String.fromCharCode(Number.parseInt(hex, 16)))
        .join("")
    } catch {
      return "Invalid hex input"
    }
  }

  static binaryEncode(text: string): string {
    return [...text].map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")
  }

  static binaryDecode(text: string): string {
    try {
      return text
        .split(" ")
        .map((bin) => String.fromCharCode(Number.parseInt(bin, 2)))
        .join("")
    } catch {
      return "Invalid binary input"
    }
  }

  static jwtDecode(jwt: string): string {
    try {
      const parts = jwt.split(".")
      if (parts.length === 3) {
        const header = JSON.parse(atob(parts[0]))
        const payload = JSON.parse(atob(parts[1]))
        return JSON.stringify({ header, payload }, null, 2)
      } else {
        return "Invalid JWT format"
      }
    } catch {
      return "Invalid JWT token"
    }
  }

  static jsonFormat(json: string): string {
    try {
      return JSON.stringify(JSON.parse(json), null, 2)
    } catch {
      return "Invalid JSON format"
    }
  }

  static unicodeEncode(text: string): string {
    return [...text].map((c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")).join("")
  }

  static unicodeDecode(text: string): string {
    try {
      return text.replace(/\\u[\dA-Fa-f]{4}/g, (match) =>
        String.fromCharCode(parseInt(match.replace("\\u", ""), 16)),
      )
    } catch {
      return "Invalid Unicode input"
    }
  }

  static async qrGenerate(text: string): Promise<string> {
    try {
      return await QRCode.toDataURL(text)
    } catch {
      return "Error generating QR Code"
    }
  }

  static async xmlDecode(xml: string): Promise<string> {
    try {
      const result = await parseStringPromise(xml, { explicitArray: false })
      return JSON.stringify(result, null, 2)
    } catch {
      return "Invalid XML format"
    }
  }
}
