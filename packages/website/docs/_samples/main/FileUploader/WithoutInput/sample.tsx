import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/upload.js";

const Button = createReactComponent(ButtonClass);
const FileUploader = createReactComponent(FileUploaderClass);
const Label = createReactComponent(LabelClass);

function App() {
  return (
    <>
      <Label for="button-only-uploader">Choose file:</Label>
      <FileUploader id="button-only-uploader" hideInput={true}>
        <Button icon="upload" tabIndex={-1}>
          Upload
        </Button>
      </FileUploader>
    </>
  );
}

export default App;
