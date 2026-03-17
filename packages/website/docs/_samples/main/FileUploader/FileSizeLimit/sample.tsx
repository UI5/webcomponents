import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/upload.js";

const FileUploader = createReactComponent(FileUploaderClass);
const Label = createReactComponent(LabelClass);

function App() {
  const [valueState, setValueState] = useState<`${ValueState}`>("None");
  const [valueStateMessage, setValueStateMessage] = useState("");

  const handleFileSizeExceed = (
    e: UI5CustomEvent<FileUploaderClass, "file-size-exceed">,
  ) => {
    const uploaderMaxSize = 2;
    const filesData = e.detail.filesData;
    const fileNames = filesData
      .map((fileData: any) => fileData.fileName)
      .join(", ");
    setValueState("Negative");
    setValueStateMessage(
      `${fileNames} exceeds the limit of ${uploaderMaxSize} MB.`,
    );
  };

  const handleChange = () => {
    setValueState("None");
    setValueStateMessage("");
  };

  return (
    <>
      <div style={{ height: "300px" }}>
        <Label showColon={true} for="max-file-size-uploader">Upload files up to 2 MB</Label>
        <FileUploader
          maxFileSize={2}
          id="max-file-size-uploader"
          multiple={true}
          valueState={valueState}
          onFileSizeExceed={handleFileSizeExceed}
          onChange={handleChange}
        >
          {valueStateMessage && (
            <div slot="valueStateMessage">{valueStateMessage}</div>
          )}
        </FileUploader>
      </div>
    </>
  );
}

export default App;
