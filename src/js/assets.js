// Relative to the document, so hash routes work at / and at /repository/.
export function assetUrl(path) {
  const base = import.meta.env?.BASE_URL ?? './';
  return `${base}${path.replace(/^\.?\//, '')}`;
}
