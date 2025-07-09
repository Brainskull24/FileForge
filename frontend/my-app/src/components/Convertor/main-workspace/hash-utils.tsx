"use client"

export class HashUtils {
  // Simple MD5-like hash (not cryptographically secure, for demo purposes)
  static md5(text: string): string {
    // This is a simplified hash for demo purposes
    // In a real application, use a proper crypto library
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return `${Math.abs(hash).toString(16).padStart(8, "0")}`
  }

  // Simple SHA256-like hash (not cryptographically secure, for demo purposes)
  static sha256(text: string): string {
    // This is a simplified hash for demo purposes
    // In a real application, use a proper crypto library
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return `${Math.abs(hash).toString(16).padStart(16, "0")}`
  }
}
