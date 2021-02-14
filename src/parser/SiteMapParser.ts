import fs from "fs";
import path from "path";
import { SaxEventType, SAXParser } from "sax-wasm";
export class SiteMapParser {
  private static saxPath = require.resolve("sax-wasm/lib/sax-wasm.wasm");
  private static saxWasmBuffer: Buffer = fs.readFileSync(SiteMapParser.saxPath);
  private static options = { highWaterMark: 32 * 1024 };
  private parser: SAXParser;
  constructor() {
    this.parser = new SAXParser(SaxEventType.Text, SiteMapParser.options);
  }

  /**
   * setHandlerFunction
   */
  public setHandlerFunction(func: any) {
    this.parser.eventHandler = func;
  }

  public addFileListToProcessing(listOfFile: Array<string>) {
      listOfFile.forEach(filePath => {
          this.parser
            .prepareWasm(SiteMapParser.saxWasmBuffer)
            .then((ready: Boolean) => {
              if (ready) {
                const readable = fs.createReadStream(
                  path.resolve(
                    path.resolve(
                      ".",
                      filePath
                    )
                  ),
                  SiteMapParser.options
                );
                readable.on("data", (chunk: Buffer) => {
                  this.parser.write(chunk);
                });
                readable.on("end", () => {
                  this.parser.end();
                });
              }
            });
      });
  }
}
