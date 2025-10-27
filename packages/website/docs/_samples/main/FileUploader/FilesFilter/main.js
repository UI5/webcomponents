import "@ui5/webcomponents/dist/FileUploader.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";

import "@ui5/webcomponents-icons/dist/upload.js";

const fileUploader = document.querySelector("#image-uploader");
const resultDiv = document.querySelector("#result");

fileUploader.addEventListener("change", (event) => {
    const files = event.target.files;

    if (!files.length) {
        resultDiv.innerHTML = "<ui5-label>No Files Selected</ui5-label>";
    } else {
        resultDiv.innerHTML = "";
        resultDiv.style.marginTop = "1rem";
        for (let i = 0; i < files.length; i++) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(files[i]);
            img.width = 100;
            img.height = 100;
            img.onload = function () {
                URL.revokeObjectURL(img.src);
            }
            resultDiv.appendChild(img);
        }
    }
})