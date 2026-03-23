import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/upload.js";

const FileUploader = createReactComponent(FileUploaderClass);
const Label = createReactComponent(LabelClass);

function App() {
  return (
    <>
      <div style={{ height: "100px" }}>
        <Label showColon={true} for="single-file-uploader">Upload a single file</Label>
        <FileUploader id="single-file-uploader" />
      </div>
    </>
  );
}

export default App;
