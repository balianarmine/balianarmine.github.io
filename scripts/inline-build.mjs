import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

// Встраиваем ресурсы, чтобы сборка работала через file:// без загрузки модулей.
const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const asset = path => readFileSync(resolve(dist, path.replace(/^\.?\//, '')), 'utf8');
let html = readFileSync(resolve(dist, 'index.html'), 'utf8');
let scriptCount = 0;
let styleCount = 0;
const scripts = [];
html = html.replace(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g, (_, path) => {
  const source = asset(path);
  // Запрещаем незаметно выпустить сборку с import/export или import.meta.
  new Script(source);
  if (/\bimport\s*\(/.test(source)) throw new Error('Dynamic imports are not supported by the file build');
  scriptCount++;
  scripts.push(`<script>${source.replace(/<\/script/gi, '<\\/script')}</script>`);
  return '';
});
html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_, path) => {
  styleCount++;
  return `<style>${asset(path).replace(/<\/style/gi, '<\\/style')}</style>`;
});
if (scriptCount !== 1 || styleCount < 1) throw new Error('Unexpected Vite output: expected one script and CSS');
// Обычный скрипт должен выполняться после появления #root.
html = html.replace('</body>', `${scripts.join('\n')}</body>`);
writeFileSync(resolve(dist, 'index.html'), html);
console.log('Built file:// compatible index.html with inline JavaScript and CSS');
