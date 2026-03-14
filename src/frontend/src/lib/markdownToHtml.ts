/**
 * Simple markdown to HTML converter for documentation content.
 * Handles: headings, tables, blockquotes, lists, hr, bold, italic, code, links.
 */
export function markdownToHtml(md: string): string {
  let html = md;

  // Escape HTML special chars (do before other transforms)
  // We'll handle this carefully

  // Normalize line endings
  html = html.replace(/\r\n/g, "\n");

  // Code blocks (fenced)
  html = html.replace(
    /```([\w]*)\n([\s\S]*?)```/g,
    (_m, _lang, code) => `<pre><code>${escHtml(code.trim())}</code></pre>`,
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    (_m, code) => `<code>${escHtml(code)}</code>`,
  );

  // Tables: parse table blocks
  html = html.replace(/((?:\|.+\|\n?)+)/g, (block) => {
    const rows = block.trim().split("\n");
    if (rows.length < 2) return block;
    // Check if second row is separator
    const isSep = (r: string) => /^[\s|:-]+$/.test(r);
    if (!isSep(rows[1])) return block;

    const headerCells = parseRow(rows[0]);
    const bodyRows = rows.slice(2);
    const thead = `<thead><tr>${headerCells.map((c) => `<th>${mdInline(c)}</th>`).join("")}</tr></thead>`;
    const tbody = `<tbody>${bodyRows
      .map(
        (r) =>
          `<tr>${parseRow(r)
            .map((c) => `<td>${mdInline(c)}</td>`)
            .join("")}</tr>`,
      )
      .join("\n")}</tbody>`;
    return `<div class="md-table-scroll"><table>${thead}${tbody}</table></div>\n`;
  });

  // Headings
  html = html.replace(
    /^######\s+(.+)$/gm,
    (_m, t) => `<h6>${mdInline(t)}</h6>`,
  );
  html = html.replace(/^#####\s+(.+)$/gm, (_m, t) => `<h5>${mdInline(t)}</h5>`);
  html = html.replace(/^####\s+(.+)$/gm, (_m, t) => `<h4>${mdInline(t)}</h4>`);
  html = html.replace(/^###\s+(.+)$/gm, (_m, t) => `<h3>${mdInline(t)}</h3>`);
  html = html.replace(/^##\s+(.+)$/gm, (_m, t) => `<h2>${mdInline(t)}</h2>`);
  html = html.replace(/^#\s+(.+)$/gm, (_m, t) => `<h1>${mdInline(t)}</h1>`);

  // Blockquotes
  html = html.replace(/((?:^>.*\n?)+)/gm, (block) => {
    const inner = block
      .split("\n")
      .map((l) => l.replace(/^>\s?/, ""))
      .join("\n");
    return `<blockquote><p>${mdInline(inner.trim())}</p></blockquote>\n`;
  });

  // Horizontal rules
  html = html.replace(/^(?:---+|___+|\*\*\*+)\s*$/gm, "<hr />");

  // Unordered lists
  html = html.replace(/((?:^[\-\*]\s.+\n?)+)/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((l) => l.replace(/^[\-\*]\s/, "").trim())
      .filter(Boolean)
      .map((l) => `<li>${mdInline(l)}</li>`)
      .join("\n");
    return `<ul>${items}</ul>\n`;
  });

  // Ordered lists
  html = html.replace(/((?:^\d+\.\s.+\n?)+)/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((l) => l.replace(/^\d+\.\s/, "").trim())
      .filter(Boolean)
      .map((l) => `<li>${mdInline(l)}</li>`)
      .join("\n");
    return `<ol>${items}</ol>\n`;
  });

  // Paragraphs: wrap consecutive non-empty lines not already wrapped
  html = html
    .split("\n\n")
    .map((block) => {
      const b = block.trim();
      if (!b) return "";
      if (
        b.startsWith("<h") ||
        b.startsWith("<ul") ||
        b.startsWith("<ol") ||
        b.startsWith("<pre") ||
        b.startsWith("<blockquote") ||
        b.startsWith("<hr") ||
        b.startsWith("<div") ||
        b.startsWith("<table") ||
        b.startsWith("<p")
      ) {
        return b;
      }
      return `<p>${mdInline(b.replace(/\n/g, " "))}</p>`;
    })
    .join("\n");

  return html;
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function parseRow(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function mdInline(s: string): string {
  let out = s;
  // Bold
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  // Italic
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(/_([^_]+)_/g, "<em>$1</em>");
  // Inline code
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Links
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  // Checkboxes ✓
  out = out.replace(
    /^✓\s*(.+)$/,
    '<span style="color:#2E7D32;font-weight:600">✓</span> $1',
  );
  return out;
}
