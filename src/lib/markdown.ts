import { marked } from 'marked';

// Configure marked with safe options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert line breaks to <br>
});

/**
 * Convert markdown content to HTML
 * @param markdown - The markdown string to convert
 * @returns HTML string
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  try {
    const result = marked.parse(markdown);
    return typeof result === 'string' ? result : '';
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return markdown; // Fallback to original text
  }
}

/**
 * Check if content appears to be markdown (contains markdown syntax)
 * @param content - The content to check
 * @returns boolean indicating if content looks like markdown
 */
export function isMarkdown(content: string): boolean {
  if (!content) return false;
  
  // Check for common markdown patterns
  const markdownPatterns = [
    /^#{1,6}\s/, // Headers
    /\*\*.*\*\*/, // Bold
    /\*.*\*/, // Italic
    /\[.*\]\(.*\)/, // Links
    /^[-*+]\s/, // Unordered lists
    /^\d+\.\s/, // Ordered lists
    /```/, // Code blocks
    /`.*`/, // Inline code
    /^\|.*\|/, // Tables
  ];
  
  return markdownPatterns.some(pattern => pattern.test(content));
}
