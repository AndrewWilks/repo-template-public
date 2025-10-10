import { strict as assert } from "node:assert";
import path from 'node:path';
import { createRequire } from 'node:module';

const projectRequire = createRequire(path.resolve(process.cwd(), 'package.json'));
const { hello } = projectRequire('./dist/index.js');

assert.equal(hello("Andrew"), "hello Andrew");

console.log("test: hello passed");
