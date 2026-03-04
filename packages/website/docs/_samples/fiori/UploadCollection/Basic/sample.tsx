import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useRef, useState, useCallback } from "react";
import UploadCollectionClass from "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import UploadCollectionItemClass from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/document.js";
import "@ui5/webcomponents-icons/dist/document-text.js";

const UploadCollection = createComponent(UploadCollectionClass);
const UploadCollectionItem = createComponent(UploadCollectionItemClass);
const Button = createComponent(ButtonClass);
const FileUploader = createComponent(FileUploaderClass);
const Icon = createComponent(IconClass);
const Label = createComponent(LabelClass);
const Title = createComponent(TitleClass);

function App() {
  const uploadCollectionRef = useRef(null);
  const [newFiles, setNewFiles] = useState([]);

  const handleFileUploaderChange = useCallback((e) => {
    const files = e.detail.files;
    const additions = [];
    for (let i = 0; i < files.length; i++) {
      additions.push({
        id: Date.now() + "-" + i,
        file: files[i],
        fileName: files[i].name,
        description: `Last modified: ${files[i].lastModifiedDate}, size: ${files[i].size}`,
        uploadState: "Ready",
      });
    }
    setNewFiles((prev) => [...prev, ...additions]);
  }, []);

  const handleStartUploadingClick = useCallback(() => {
    const uc = uploadCollectionRef.current;
    if (!uc) return;
    uc.items
      .filter((item) => item.uploadState === "Ready" && item.file)
      .forEach((item) => {
        item.uploadState = "Uploading";

        fetch("/upload", {
          method: "POST",
          body: item.file,
        }).then((res) => {
          item.uploadState = res.status === 200 ? "Complete" : "Error";
        });
      });
  }, []);

  const handleUploadCollectionItemDelete = useCallback((e) => {
    const deletedItem = e.detail.item;
    const fileId = deletedItem.dataset.fileId;
    if (fileId) {
      setNewFiles((prev) => prev.filter((f) => f.id !== fileId));
    } else {
      deletedItem.parentElement?.removeChild(deletedItem);
    }
  }, []);

  return (
    <>
      <style>{`
        .header {
            display: flex;
            align-items: center;
            overflow: hidden;
            flex-wrap: wrap;
        }

        .spacer {
            flex: 1 1 auto;
        }

        .header > * {
            margin: 0.25rem;
        }
      `}</style>
      <UploadCollection ref={uploadCollectionRef} id="uploadCollection" accessibleName="Uploaded (2)" onItemDelete={handleUploadCollectionItemDelete}>
        <div slot="header" className="header">
          <Title>Uploaded (2)</Title>
          <Label showColon={true}>Add new files and press to start uploading pending files</Label>
          <Button id="startUploading" onClick={handleStartUploadingClick}>Start</Button>
          <div className="spacer"></div>
          <FileUploader id="fileUploader" hideInput={true} multiple={true} onChange={handleFileUploaderChange}>
            <Button icon="add" design="Transparent" />
          </FileUploader>
        </div>

        <UploadCollectionItem fileName="LaptopHT-1000.jpg" fileNameClickable={true} uploadState="Complete">
          Uploaded By: David Keane · Uploaded On: 2014-07-26 · File Size: 35 KB
          <img src="/images/HT-1000.jpg" slot="thumbnail" />
        </UploadCollectionItem>

        <UploadCollectionItem fileName="Notes.txt" uploadState="Complete">
          Uploaded By: John Smith · Uploaded On: 2014-09-02 · File Size: 226.6 KB
          <Icon name="document-text" slot="thumbnail" />
        </UploadCollectionItem>

        {newFiles.map((f) => (
          <UploadCollectionItem key={f.id} data-file-id={f.id} fileName={f.fileName} uploadState={f.uploadState}>
            {f.description}
            <Icon name="document" slot="thumbnail" />
          </UploadCollectionItem>
        ))}
      </UploadCollection>
    </>
  );
}

export default App;
