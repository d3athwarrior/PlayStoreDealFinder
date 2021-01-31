import fs from 'fs';
import path from 'path';
import { SaxEventType, SAXParser } from 'sax-wasm';

// Get the path to the WebAssembly binary and load it
const saxPath = require.resolve('sax-wasm/lib/sax-wasm.wasm');
const saxWasmBuffer = fs.readFileSync(saxPath);

// Instantiate
const options = {highWaterMark: 32 * 1024}; // 32k chunks
const parser = new SAXParser(SaxEventType.Attribute | SaxEventType.OpenTag, options);
parser.eventHandler = (event, data) => {
  if (event === SaxEventType.Attribute) {
    // process attribute
  } else if (event === SaxEventType.OpenTagStart) {
    console.log(data);
  }
};

// Instantiate and prepare the wasm for parsing
parser.prepareWasm(saxWasmBuffer).then(ready => {
  if (ready) {
    // stream from a file in the current directory
    const readable = fs.createReadStream(path.resolve(path.resolve('.', '../play_sitemaps_2021-01-30_1612026055-00000-of-54833.xml')), options);
    readable.on('data', (chunk) => {
      console.log(chunk);
      // parser.write
    });
    readable.on('end', () => parser.end());
  }
});
/* import Express = require("express");

const config = require("../config.json");
const expressApp = (Express.application = Express());

expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});

expressApp.listen(config.serverPort, () => {
  console.log("Example app listening on port 3000!");
}); */
