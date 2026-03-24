import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/upload.js";

const FileUploader = createReactComponent(FileUploaderClass);
const Label = createReactComponent(LabelClass);

export const Example = () => {
  return (
    <>
      <div style={{ height: "100px" }}>
        <Label showColon={true} for="multiple-files-uploader">Choose files</Label>
        <FileUploader id="multiple-files-uploader" multiple={true} />
      </div>
    </>
  );
}
