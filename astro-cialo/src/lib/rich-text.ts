function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderInline(value: string) {
  const escaped = escapeHtml(value);

  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, (_match, label, url) => {
      const external = /^https?:\/\//.test(url);
      const rel = external ? ' rel="noopener noreferrer"' : "";
      const target = external ? ' target="_blank"' : "";
      return `<a href="${url}" class="rich-link"${target}${rel}>${label}</a>`;
    });
}

function flushList(buffer: string[], listType: "ul" | "ol" | null, html: string[]) {
  if (!buffer.length || !listType) {
    return;
  }

  const items = buffer
    .map((item) => `<li>${renderInline(item)}</li>`)
    .join("");

  html.push(`<${listType} class="rich-list rich-list-${listType}">${items}</${listType}>`);
  buffer.length = 0;
}

function flushTable(rows: string[][], html: string[]) {
  if (!rows.length) {
    return;
  }

  const [headerRow, ...bodyRows] = rows;
  const head = `<thead><tr>${headerRow
    .map((cell) => `<th>${renderInline(cell)}</th>`)
    .join("")}</tr></thead>`;
  const body = `<tbody>${bodyRows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`
    )
    .join("")}</tbody>`;

  html.push(`<div class="rich-table-wrap"><table class="rich-table">${head}${body}</table></div>`);
  rows.length = 0;
}

export function renderArticleHtml(content: string) {
  const lines = content.trim().split(/\r?\n/);
  const html: string[] = [];
  const listBuffer: string[] = [];
  const tableRows: string[][] = [];
  let listType: "ul" | "ol" | null = null;
  let insideTable = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushList(listBuffer, listType, html);
      listType = null;
      flushTable(tableRows, html);
      insideTable = false;
      continue;
    }

    if (line.startsWith("|") && line.endsWith("|")) {
      flushList(listBuffer, listType, html);
      listType = null;

      if (/^\|[\s\-:|]+\|$/.test(line)) {
        continue;
      }

      insideTable = true;
      tableRows.push(line.split("|").slice(1, -1).map((cell) => cell.trim()));
      continue;
    }

    if (insideTable) {
      flushTable(tableRows, html);
      insideTable = false;
    }

    if (line === "---") {
      flushList(listBuffer, listType, html);
      listType = null;
      html.push('<hr class="rich-divider" />');
      continue;
    }

    if (line.startsWith("#### ")) {
      flushList(listBuffer, listType, html);
      listType = null;
      html.push(`<h4>${renderInline(line.slice(5))}</h4>`);
      continue;
    }

    if (line.startsWith("### ")) {
      flushList(listBuffer, listType, html);
      listType = null;
      html.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("## ")) {
      flushList(listBuffer, listType, html);
      listType = null;
      html.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith("- ")) {
      if (listType !== "ul") {
        flushList(listBuffer, listType, html);
        listType = "ul";
      }

      listBuffer.push(line.slice(2));
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      if (listType !== "ol") {
        flushList(listBuffer, listType, html);
        listType = "ol";
      }

      listBuffer.push(line.replace(/^\d+\.\s/, ""));
      continue;
    }

    flushList(listBuffer, listType, html);
    listType = null;
    html.push(`<p>${renderInline(line)}</p>`);
  }

  flushList(listBuffer, listType, html);
  flushTable(tableRows, html);

  return html.join("\n");
}
