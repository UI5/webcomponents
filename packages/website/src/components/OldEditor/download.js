import Tar from "tarts";
import packageJSON from "./sample/sample-package.js";
import tsConfigJSON from "./sample/sample-tsconfig.js";

const TAR_NAME = "ui5-webcomponents-sample.tar";
let TS = false;


const preprocessFiles = (fileInfo) => {
  const fileName = fileInfo.name;
  const fileContent = fileInfo.content;

  const processedFileInfo = {
    name: fileName,
    content: fileContent,
  }

  if (fileName.endsWith(".js") || fileName.endsWith(".ts")) {
    let content = fileContent.replace(`import "./playground-support.js";`, "");
    content = content.replaceAll(`/* playground-hide-end */`, "");
    content = content.replaceAll(`/* playground-hide */`, "");
    processedFileInfo.content = content.replace(/^\s*[\r\n]+(?=import)/, '');
  }
  
  if (fileName.endsWith(".html")) {
    let content = fileContent.replaceAll(`<!-- playground-fold-end -->`, "");
    content = TS ? content.replace("main.js", "main.ts") : content;
    processedFileInfo.content = content.replaceAll(`<!-- playground-fold -->`, "");
  }

  return processedFileInfo;
}

const covertToFilesArray = (sampleFilesInfo = {}) => {
  TS = false;

  return Object.keys(sampleFilesInfo).map(fileName => {
    const fileInfo = sampleFilesInfo[fileName];

    if (fileName.endsWith(".ts")) {
      TS = true;
    }
      
    return {
      name: fileName,
      content: fileInfo.content,
    };
  });
};


const startDownload = (tar, tarName) => {
  const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([tar], { type: "application/tar" }));
    a.download = tarName;
    a.click();
    a.remove();
};


const download = (sampleFilesInfo) => {
  const sampleFiles = covertToFilesArray(sampleFilesInfo).map(preprocessFiles);

  const projectFiles = TS ? [{
      name: "package.json",
      content: packageJSON,
    },
    {
      name: "tsconfig.json",
      content: tsConfigJSON,
    }] : [{
      name: "package.json",
      content: packageJSON,
    }
  ];

  startDownload(Tar([
    ...projectFiles,
    ...sampleFiles,
  ]), TAR_NAME);
};

export default download;
