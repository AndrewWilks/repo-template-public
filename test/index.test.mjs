import { strict as assert } from "node:assert";
import path from 'node:path';
import { createRequire } from 'node:module';

const __dirname = path.dirname(new URL(import.meta.url).pathname.replace(/^\//, ''));
const distPath = path.resolve(__dirname, '..', 'dist', 'index.js');
const require = createRequire(import.meta.url);
const { hello } = require(distPath);

assert.equal(hello("Andrew"), "hello Andrew");

console.log("test: hello passed");
