'use client';

import { markdownToHtml } from '@/lib/markdown';

export default function MarkdownTestPage() {
  const sampleMarkdown = `
# This is a heading

This is a **bold text** and this is *italic text*.

## Subheading

Here's a list:
- Item 1
- Item 2
- Item 3

Here's a numbered list:
1. First item
2. Second item
3. Third item

> This is a blockquote

Here's some \`inline code\` and here's a code block:

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

[This is a link](https://example.com)
`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Markdown Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Raw Markdown:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {sampleMarkdown}
          </pre>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Rendered HTML:</h2>
          <div 
            className="prose border p-4 rounded"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(sampleMarkdown) }}
          />
        </div>
      </div>
    </div>
  );
}
