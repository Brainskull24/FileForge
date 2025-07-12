"use client"

export class FileEncodingLogic {
  static async encodeFiles(files: File[], encodingType: string): Promise<string> {
    if (files.length === 0) {
      throw new Error("No files provided")
    }

    // For multiple files, we'll encode each and separate with headers
    const results: string[] = []

    for (const file of files) {
      const result = await this.encodeFile(file, encodingType)

      if (files.length > 1) {
        results.push(`=== ${file.name} ===\n${result}\n`)
      } else {
        results.push(result)
      }
    }

    return results.join("\n")
  }

  private static async encodeFile(file: File, encodingType: string): Promise<string> {
    switch (encodingType) {
      case "file-to-base64":
      case "image-to-base64":
      case "pdf-to-base64":
        return await this.fileToBase64(file)

      case "file-to-base32":
        return await this.fileToBase32(file)

      case "file-to-hex":
        return await this.fileToHex(file)

      case "file-to-binary":
        return await this.fileToBinary(file)

      default:
        throw new Error(`Unsupported encoding type: ${encodingType}`)
    }
  }

  private static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result as string
        // Return both data URL format and clean base64
        const base64Clean = result.split(",")[1]
        const output = [
          `File: ${file.name}`,
          `Size: ${this.formatFileSize(file.size)}`,
          `Type: ${file.type}`,
          ``,
          `Data URL format:`,
          result,
          ``,
          `Clean Base64:`,
          base64Clean,
        ].join("\n")

        resolve(output)
      }

      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsDataURL(file)
    })
  }

  private static async fileToBase32(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer
        const uint8Array = new Uint8Array(arrayBuffer)
        const base32 = this.arrayBufferToBase32(uint8Array)

        const output = [
          `File: ${file.name}`,
          `Size: ${this.formatFileSize(file.size)}`,
          `Type: ${file.type}`,
          ``,
          `Base32 Encoded:`,
          base32,
        ].join("\n")

        resolve(output)
      }

      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsArrayBuffer(file)
    })
  }

  private static async fileToHex(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer
        const uint8Array = new Uint8Array(arrayBuffer)
        const hex = Array.from(uint8Array)
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join(" ")

        const output = [
          `File: ${file.name}`,
          `Size: ${this.formatFileSize(file.size)}`,
          `Type: ${file.type}`,
          ``,
          `Hexadecimal:`,
          hex,
        ].join("\n")

        resolve(output)
      }

      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsArrayBuffer(file)
    })
  }

  private static async fileToBinary(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer
        const uint8Array = new Uint8Array(arrayBuffer)

        // For large files, we'll show first 1KB and indicate truncation
        const maxBytes = Math.min(uint8Array.length, 1024)
        const binary = Array.from(uint8Array.slice(0, maxBytes))
          .map((byte) => byte.toString(2).padStart(8, "0"))
          .join(" ")

        const truncated = uint8Array.length > 1024

        const output = [
          `File: ${file.name}`,
          `Size: ${this.formatFileSize(file.size)}`,
          `Type: ${file.type}`,
          truncated ? `Note: Showing first 1KB of ${this.formatFileSize(uint8Array.length)}` : "",
          ``,
          `Binary:`,
          binary,
          truncated ? "\n... (truncated)" : "",
        ]
          .filter((line) => line !== "")
          .join("\n")

        resolve(output)
      }

      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsArrayBuffer(file)
    })
  }

  private static arrayBufferToBase32(uint8Array: Uint8Array): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    let bits = ""
    let result = ""

    // Convert bytes to bits
    for (let i = 0; i < uint8Array.length; i++) {
      bits += uint8Array[i].toString(2).padStart(8, "0")
    }

    // Pad to multiple of 5
    while (bits.length % 5 !== 0) {
      bits += "0"
    }

    // Convert 5-bit chunks to base32
    for (let i = 0; i < bits.length; i += 5) {
      const chunk = bits.substr(i, 5)
      result += alphabet[Number.parseInt(chunk, 2)]
    }

    // Add padding
    while (result.length % 8 !== 0) {
      result += "="
    }

    return result
  }

  private static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }
}
