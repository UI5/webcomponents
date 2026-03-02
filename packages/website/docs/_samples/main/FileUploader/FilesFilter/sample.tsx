import { createReactComponent } from "@ui5/webcomponents-base";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const FileUploader = createReactComponent(FileUploaderClass);
const Label = createReactComponent(LabelClass);

function App() {

  const handleChange = (e) => {
    const files = e.target.files;

    if (!files.length) {
        resultDiv.innerHTML = "<ui5-label>No Files Selected</ui5-label>";
  };

  return (
    <>
      <div style={{ height: "100px" }}>
            <Label htmlFor="image-uploader">Upload images:</Label>
            <FileUploader id="image-uploader" accept="image/*" multiple={true} />
        </div>

        <div id="result"></div>
    </>
  );
}

export default App;
