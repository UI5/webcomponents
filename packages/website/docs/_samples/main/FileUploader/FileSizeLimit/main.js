import "@ui5/webcomponents/dist/FileUploader.js";
import "@ui5/webcomponents/dist/Button.js";

import "@ui5/webcomponents-icons/dist/upload.js";

const fileUploader = document.querySelector("#max-file-size-uploader");

fileUploader.addEventListener("file-size-exceed", function (event) {
    const uploaderMaxSize = fileUploader.maxFileSize;
    const filesData = event.detail.filesData;
    const fileNames = filesData.map(fileData => fileData.fileName).join(", ");
    fileUploader.valueState = "Negative";
    fileUploader.innerHTML = `<div slot="valueStateMessage">${fileNames} exceeds the limit of ${uploaderMaxSize} MB.</div>`;
});

fileUploader.addEventListener("change", function (event) {
    fileUploader.valueState = "None";
});