import { createReactComponent } from "@ui5/webcomponents-base";
import UploadCollectionClass from "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const UploadCollection = createReactComponent(UploadCollectionClass);
const Button = createReactComponent(ButtonClass);
const FileUploader = createReactComponent(FileUploaderClass);
const Label = createReactComponent(LabelClass);
const Title = createReactComponent(TitleClass);

function App() {

  const handleChange = (e) => {
    var files = e.detail.files;
    for (var i = 0; i < files.length; i++) {
        uploadCollection.appendChild(createUCI(files[i]));
  };

  const handleClick = () => {
    uploadCollection.items
        .filter(item => item.uploadState === "Ready" && item.file)
        .forEach(item => {
            item.uploadState = "Uploading";

            fetch("/upload", {
                method: "POST",
                body: item.file
  };

  const handleDrop = (e) => {
    e.preventDefault();

    var files = e.dataTransfer.files;
    // Take the files from the drop e and create <ui5-upload-collection-item> from them
    for (var i = 0; i < files.length; i++) {
        uploadCollection.appendChild(createUCI(files[i]));
  };

  const handleUi5ItemDelete = (e) => {
    uploadCollection.removeChild(e.detail.item);
  };

  return (
    <>
      <UploadCollection>
            <div slot="header" className="header">
                <Title>Attachments</Title>
                <Label show-colon={true}>Add new files and press to start uploading pending files</Label>
                <Button id="startUploading">Start</Button>
                <div className="spacer"></div>
                <FileUploader id="fileUploader" hide-input={true} multiple={true}>
                    <Button icon="add" design="Transparent" />
                </FileUploader>
            </div>
        </UploadCollection>
    </>
  );
}

export default App;
