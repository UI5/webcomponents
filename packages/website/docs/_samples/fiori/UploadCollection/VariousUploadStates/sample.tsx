import { createReactComponent } from "@ui5/webcomponents-base";
import { useState } from "react";
import UploadCollectionClass from "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import UploadCollectionItemClass from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/document-text.js";

const UploadCollection = createReactComponent(UploadCollectionClass);
const UploadCollectionItem = createReactComponent(UploadCollectionItemClass);
const Icon = createReactComponent(IconClass);
const Title = createReactComponent(TitleClass);

const initialFiles = [
  { id: "1", fileName: "LaptopHT-1000.jpg", uploadState: "Complete", description: 'uploadState="Complete"', thumbnail: "img", thumbnailSrc: "/images/HT-1000.jpg" },
  { id: "2", fileName: "Laptop.jpg", uploadState: "Uploading", type: "Active", progress: 37, description: 'uploadState="Uploading"', thumbnail: "img", thumbnailSrc: "/images/HT-1000.jpg" },
  { id: "3", fileName: "latest-reports.pdf", uploadState: "Error", type: "Active", progress: 59, description: 'uploadState="Error"', thumbnail: "icon", thumbnailName: "document-text" },
  { id: "4", fileName: "Notes.txt", uploadState: "Ready", description: 'uploadState="Ready" (default)', thumbnail: "icon", thumbnailName: "document-text" },
];

function App() {
  const [files, setFiles] = useState(initialFiles);

  const handleUploadCollectionRetry = (e) => {
    alert("Retry uploading: " + e.target.fileName);
  };

  const handleUploadCollectionTerminate = (e) => {
    alert("Terminate uploading of: " + e.target.fileName);
  };

  const handleUploadCollectionItemDelete = (e) => {
    const deletedItem = e.detail.item;
    setFiles(prev => prev.filter(f => f.fileName !== deletedItem.fileName));
  };

  return (
    <>
      <UploadCollection onRetry={handleUploadCollectionRetry} onTerminate={handleUploadCollectionTerminate} onItemDelete={handleUploadCollectionItemDelete}>
            <div slot="header" className="header">
                <Title>Attachments ({files.length})</Title>
            </div>

            {files.map((file) => (
              <UploadCollectionItem key={file.id} fileName={file.fileName} uploadState={file.uploadState} type={file.type} progress={file.progress}>
                {file.description}
                {file.thumbnail === "img" ? (
                  <img src={file.thumbnailSrc} slot="thumbnail" />
                ) : (
                  <Icon name={file.thumbnailName} slot="thumbnail" />
                )}
              </UploadCollectionItem>
            ))}
        </UploadCollection>
    </>
  );
}

export default App;
