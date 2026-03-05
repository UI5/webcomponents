import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/upload.js";

const FileUploader = createComponent(FileUploaderClass);
const Label = createComponent(LabelClass);

function App() {
  const [images, setImages] = useState<string[]>([]);

  const handleFileUploaderChange = (e: UI5CustomEvent<FileUploaderClass, "change">) => {
    const files = e.target.files;

    if (!files.length) {
      setImages([]);
    } else {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        urls.push(URL.createObjectURL(files[i]));
      }
      setImages(urls);
    }
  };

  return (
    <>
      <div style={{ height: "100px" }}>
            <Label htmlFor="image-uploader">Upload images:</Label>
            <FileUploader id="image-uploader" accept="image/*" multiple={true} onChange={handleFileUploaderChange} />
        </div>

        <div id="result" style={images.length > 0 ? { marginTop: "1rem" } : undefined}>
            {images.length === 0 ? null : images.map((src, index) => (
                <img key={index} src={src} width={100} height={100} onLoad={(e: React.SyntheticEvent) => URL.revokeObjectURL((e.target as HTMLImageElement).src)} />
            ))}
        </div>
    </>
  );
}

export default App;
