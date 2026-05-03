import { mkdirSync, copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const sourceDir = resolve(rootDir, 'node_modules/stockfish/bin');
const targetDir = resolve(rootDir, 'public/stockfish');

mkdirSync(targetDir, { recursive: true });
copyFileSync(
  resolve(sourceDir, 'stockfish-18-lite-single.js'),
  resolve(targetDir, 'stockfish-18-lite-single.js')
);
copyFileSync(
  resolve(sourceDir, 'stockfish-18-lite-single.wasm'),
  resolve(targetDir, 'stockfish.wasm')
);

console.log('Stockfish browser assets copied to public/stockfish');
