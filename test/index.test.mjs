import { strict as assert } from "node:assert";
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const distPath = path.resolve(__dirname, '..', 'dist', 'index.js');
const distUrl = pathToFileURL(distPath).href;
const { hello } = await import(distUrl);

assert.equal(hello("Andrew"), "hello Andrew");

console.log("test: hello passed");
