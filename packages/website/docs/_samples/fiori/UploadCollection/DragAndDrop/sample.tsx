import { createReactComponent } from "@ui5/webcomponents-base";
import { useState, useRef, useCallback } from "react";
import UploadCollectionClass from "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import UploadCollectionItemClass from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/document-text.js";
import "@ui5/webcomponents-icons/dist/add.js";

const UploadCollection = createReactComponent(UploadCollectionClass);
const UploadCollectionItem = createReactComponent(UploadCollectionItemClass);
const Button = createReactComponent(ButtonClass);
const FileUploader = createReactComponent(FileUploaderClass);
const Icon = createReactComponent(IconClass);
const Label = createReactComponent(LabelClass);
const Title = createReactComponent(TitleClass);

function App() {
  const [items, setItems] = useState([]);
  const fileIdCounter = useRef(0);

  const addFiles = useCallback((files) => {
    const newItems = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newItems.push({
        id: fileIdCounter.current++,
        file: file,
        fileName: file.name,
        description: "Last modified: " + file.lastModifiedDate + ", size: " + file.size,
        uploadState: "Ready",
      });
    }
    setItems(prev => [...prev, ...newItems]);
  }, []);

  const handleFileUploaderChange = useCallback((e) => {
    addFiles(e.detail.files);
  }, [addFiles]);

  const handleStartUploadingClick = useCallback(() => {
    setItems(prev => prev.map(item => {
      if (item.uploadState === "Ready" && item.file) {
        const updatedItem = { ...item, uploadState: "Uploading" };

        fetch("/upload", {
          method: "POST",
          body: item.file
        }).then(res => {
          setItems(prevItems => prevItems.map(i =>
            i.id === item.id
              ? { ...i, uploadState: res.status === 200 ? "Complete" : "Error" }
              : i
          ));
        });

        return updatedItem;
      }
      return item;
    }));
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleItemDelete = useCallback((e) => {
    const deletedItem = e.detail.item;
    setItems(prev => prev.filter(item => item.fileName !== deletedItem.fileName));
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
      <UploadCollection
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onItemDelete={handleItemDelete}
      >
        <div slot="header" className="header">
          <Title>Attachments</Title>
          <Label showColon={true}>Add new files and press to start uploading pending files</Label>
          <Button onClick={handleStartUploadingClick}>Start</Button>
          <div className="spacer"></div>
          <FileUploader hideInput={true} multiple={true} onChange={handleFileUploaderChange}>
            <Button icon="add" design="Transparent" />
          </FileUploader>
        </div>
        {items.map((item) => (
          <UploadCollectionItem
            key={item.id}
            fileName={item.fileName}
            uploadState={item.uploadState}
          >
            <Icon slot="thumbnail" name="document" />
            {item.description}
          </UploadCollectionItem>
        ))}
      </UploadCollection>
    </>
  );
}

export default App;
