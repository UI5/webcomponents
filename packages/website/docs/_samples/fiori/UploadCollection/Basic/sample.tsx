import { createReactComponent } from "@ui5/webcomponents-base";
import UploadCollectionClass from "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import UploadCollectionItemClass from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const UploadCollection = createReactComponent(UploadCollectionClass);
const UploadCollectionItem = createReactComponent(UploadCollectionItemClass);
const Button = createReactComponent(ButtonClass);
const FileUploader = createReactComponent(FileUploaderClass);
const Icon = createReactComponent(IconClass);
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

  const handleUi5ItemDelete = (e) => {
    uploadCollection.removeChild(e.detail.item);
  };

  return (
    <>
      <UploadCollection id="uploadCollection" accessible-name="Uploaded (2)">
            <div slot="header" className="header">
                <Title>Uploaded (2)</Title>
                <Label show-colon={true}>Add new files and press to start uploading pending files</Label>
                <Button id="startUploading">Start</Button>
                <div className="spacer"></div>
                <FileUploader id="fileUploader" hide-input={true} multiple={true}>
                    <Button icon="add" design="Transparent" />
                </FileUploader>
            </div>

            <UploadCollectionItem file-name="LaptopHT-1000.jpg" file-name-clickable={true} upload-state="Complete">
                Uploaded By: David Keane · Uploaded On: 2014-07-26 · File Size: 35 KB
                <img src="/images/HT-1000.jpg" slot="thumbnail" />
            </UploadCollectionItem>

            <UploadCollectionItem file-name="Notes.txt" upload-state="Complete">
                Uploaded By: John Smith · Uploaded On: 2014-09-02 · File Size: 226.6 KB
                <Icon name="document-text" slot="thumbnail" />
            </UploadCollectionItem>
        </UploadCollection>
    </>
  );
}

export default App;
