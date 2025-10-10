import { strict as assert } from "node:assert";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "..", "dist", "index.js");
const { hello } = await import(dist);

assert.equal(hello("Andrew"), "hello Andrew");

console.log("test: hello passed");
