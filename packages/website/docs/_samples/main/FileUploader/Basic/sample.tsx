import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/upload.js";

const FileUploader = createComponent(FileUploaderClass);
const Label = createComponent(LabelClass);

function App() {

  return (
    <>
      <div style={{ height: "100px" }}>
            <Label htmlFor="single-file-uploader">Upload a single file:</Label>
            <FileUploader id="single-file-uploader" />
         </div>
    </>
  );
}

export default App;
