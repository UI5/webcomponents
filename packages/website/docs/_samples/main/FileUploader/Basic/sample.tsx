import { createReactComponent } from "@ui5/webcomponents-base";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const FileUploader = createReactComponent(FileUploaderClass);
const Label = createReactComponent(LabelClass);

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
