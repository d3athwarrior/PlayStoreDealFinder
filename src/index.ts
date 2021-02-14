import { SaxEventType, Text } from "sax-wasm";
import { SiteMapParser } from "./parser/SiteMapParser";

var parser = new SiteMapParser();
var fileList = new Array<string>();
fileList.push("../play_sitemaps_2021-01-30_1612026055-00000-of-54833.xml");
fileList.push("../play_sitemaps_2021-02-13_1613278844-00104-of-55048.xml");
parser.setHandlerFunction((event: any, data: any) => {
  if (event === SaxEventType.Text) {
    var textData: Text = (data as unknown) as Text;
    if (textData.value?.indexOf("apps") != -1 && textData.value.indexOf("http") != -1) {
      console.log(textData.value);
    }
  }
});
parser.addFileListToProcessing(fileList);
