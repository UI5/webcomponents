import { createReactComponent } from "@ui5/webcomponents-base";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const FileUploader = createReactComponent(FileUploaderClass);
const Label = createReactComponent(LabelClass);

function App() {

  const handleFileSizeExceed = (e) => {
    const uploaderMaxSize = fileUploader.maxFileSize;
    const filesData = e.detail.filesData;
    const fileNames = filesData.map(fileData => fileData.fileName).join(", ");
    fileUploader.valueState = "Negative";
    fileUploader.innerHTML = `<div slot="valueStateMessage">${fileNames
  };

  const handleChange = () => {
    fileUploader.valueState = "None";
  };

  return (
    <>
      <div style={{ height: "300px" }}>
            <Label htmlFor="max-file-size-uploader">Upload files up to 2 MB:</Label>
            <FileUploader max-file-size={2} id="max-file-size-uploader" multiple={true} />
        </div>
    </>
  );
}

export default App;
