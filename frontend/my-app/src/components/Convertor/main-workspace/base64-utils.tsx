"use client"

interface ProcessingResult {
  type: "text" | "file"
  content?: string
  blob?: Blob
  filename?: string
}

export class Base64Utils {
  static encode(text: string): string {
    try {
      return btoa(text)
    } catch {
      return "Error encoding to Base64"
    }
  }

  static decode(base64: string): string {
    try {
      return atob(base64)
    } catch {
      return "Invalid Base64 input"
    }
  }

  static toImage(base64: string): ProcessingResult {
    try {
      // Remove data URL prefix if present
      const cleanBase64 = base64.replace(/^data:image\/[a-z]+;base64,/, "")
      const byteCharacters = atob(cleanBase64)
      const byteArrays = [new Uint8Array([...byteCharacters].map((c) => c.charCodeAt(0)))]

      // Try to detect image type from base64 header
      let mimeType = "image/png"
      let extension = "png"

      if (base64.includes("data:image/")) {
        const match = base64.match(/data:image\/([a-z]+);base64,/)
        if (match) {
          extension = match[1]
          mimeType = `image/${extension}`
        }
      } else {
        // Try to detect from binary signature
        const signature = byteCharacters.substring(0, 4)
        if (signature.includes("JFIF") || signature.includes("Exif")) {
          mimeType = "image/jpeg"
          extension = "jpg"
        } else if (signature.includes("PNG")) {
          mimeType = "image/png"
          extension = "png"
        } else if (signature.includes("GIF")) {
          mimeType = "image/gif"
          extension = "gif"
        }
      }

      const blob = new Blob(byteArrays, { type: mimeType })
      return {
        type: "file",
        blob,
        filename: `decoded-image.${extension}`,
      }
    } catch {
      return { type: "text", content: "Invalid Base64 image data" }
    }
  }

  static toFile(base64: string): ProcessingResult {
    try {
      // Remove data URL prefix if present
      const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, "")
      const byteCharacters = atob(cleanBase64)
      const byteArrays = [new Uint8Array([...byteCharacters].map((c) => c.charCodeAt(0)))]

      // Try to detect file type from base64 or binary signature
      let mimeType = "application/octet-stream"
      let extension = "bin"
      let filename = "decoded-file"

      if (base64.includes("data:")) {
        const match = base64.match(/data:([^;]+);base64,/)
        if (match) {
          mimeType = match[1]
          // Extract extension from mime type
          const typeMatch = mimeType.match(/\/([a-z0-9]+)$/)
          if (typeMatch) {
            extension = typeMatch[1]
          }
        }
      } else {
        // Try to detect from binary signature
        const signature = byteCharacters.substring(0, 10)

        if (signature.startsWith("%PDF")) {
          mimeType = "application/pdf"
          extension = "pdf"
          filename = "decoded-document"
        } else if (signature.includes("JFIF") || signature.includes("Exif")) {
          mimeType = "image/jpeg"
          extension = "jpg"
          filename = "decoded-image"
        } else if (signature.includes("PNG")) {
          mimeType = "image/png"
          extension = "png"
          filename = "decoded-image"
        } else if (signature.includes("GIF")) {
          mimeType = "image/gif"
          extension = "gif"
          filename = "decoded-image"
        } else if (signature.includes("PK")) {
          mimeType = "application/zip"
          extension = "zip"
          filename = "decoded-archive"
        }
      }

      const blob = new Blob(byteArrays, { type: mimeType })
      return {
        type: "file",
        blob,
        filename: `${filename}.${extension}`,
      }
    } catch {
      return { type: "text", content: "Invalid Base64 file data" }
    }
  }

  static toPdf(base64: string): ProcessingResult {
    try {
      const cleanBase64 = base64.replace(/^data:application\/pdf;base64,/, "")
      const byteCharacters = atob(cleanBase64)
      const byteArrays = [new Uint8Array([...byteCharacters].map((c) => c.charCodeAt(0)))]
      const blob = new Blob(byteArrays, { type: "application/pdf" })

      return {
        type: "file",
        blob,
        filename: "decoded.pdf",
      }
    } catch {
      return { type: "text", content: "Invalid Base64 PDF data" }
    }
  }

  // Base32 encoding/decoding
  static base32Encode(text: string): string {
    try {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
      let bits = ""
      let result = ""

      for (let i = 0; i < text.length; i++) {
        bits += text.charCodeAt(i).toString(2).padStart(8, "0")
      }

      // Pad to multiple of 5
      while (bits.length % 5 !== 0) {
        bits += "0"
      }

      for (let i = 0; i < bits.length; i += 5) {
        const chunk = bits.substr(i, 5)
        result += alphabet[Number.parseInt(chunk, 2)]
      }

      // Add padding
      while (result.length % 8 !== 0) {
        result += "="
      }

      return result
    } catch {
      return "Error encoding to Base32"
    }
  }

  static base32Decode(base32: string): string {
    try {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
      const cleanInput = base32.replace(/=/g, "").toUpperCase()
      let bits = ""
      let result = ""

      for (let i = 0; i < cleanInput.length; i++) {
        const index = alphabet.indexOf(cleanInput[i])
        if (index === -1) throw new Error("Invalid character")
        bits += index.toString(2).padStart(5, "0")
      }

      // Remove padding bits
      while (bits.length % 8 !== 0) {
        bits = bits.slice(0, -1)
      }

      for (let i = 0; i < bits.length; i += 8) {
        const byte = bits.substr(i, 8)
        if (byte.length === 8) {
          result += String.fromCharCode(Number.parseInt(byte, 2))
        }
      }

      return result
    } catch {
      return "Invalid Base32 input"
    }
  }
}
