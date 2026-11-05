import { readFileSync, writeFileSync } from 'node:fs';

const source = new URL('../references/02-DESIGN-SYSTEM/design-tokens.json', import.meta.url);
const target = new URL('../src/css/tokens.css', import.meta.url);
const tokens = JSON.parse(readFileSync(source, 'utf8'));
const declarations = [];
const kebab = value => value.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
function visit(value, path = []) {
  if (value && Object.hasOwn(value, 'value')) {
    declarations.push(`  --${path.map(kebab).join('-')}: ${value.value};`);
    return;
  }
  for (const [key, child] of Object.entries(value)) visit(child, [...path, key]);
}
for (const [group, value] of Object.entries(tokens)) {
  if (!['meta', '$schema'].includes(group)) visit(value, [group]);
}
const output = `/* Generated from Design System ${tokens.meta.version}. Run npm run tokens. */\n:root {\n${declarations.join('\n')}\n}\n`;
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== output) {
    throw new Error('CSS tokens are out of sync with design-tokens.json. Run npm run tokens.');
  }
  console.log(`Design System ${tokens.meta.version}: JSON and generated CSS are synchronized.`);
} else {
  writeFileSync(target, output);
}
