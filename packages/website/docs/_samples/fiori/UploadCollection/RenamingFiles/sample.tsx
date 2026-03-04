import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useRef, useState } from "react";
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
  { id: "1", fileName: "LaptopHT-1000.jpg", fileNameClickable: true, uploadState: "Complete", type: "Detail", description: "Uploaded By: David Keane \u00B7 Uploaded On: 2014-07-26 \u00B7 File Size: 35 KB", thumbnail: "img", thumbnailSrc: "/images/HT-1000.jpg" },
  { id: "2", fileName: "Notes.txt", fileNameClickable: false, uploadState: "Complete", type: "Detail", description: "Uploaded By: John Smith \u00B7 Uploaded On: 2014-09-02 \u00B7 File Size: 226.6 KB", thumbnail: "icon", thumbnailName: "document-text" },
];

function App() {
  const [files, setFiles] = useState(initialFiles);

  const handleUploadCollectionRename = (e) => {
    alert("Rename event: " + e.target.fileName);
  };

  const handleUploadCollectionItemDelete = (e) => {
    const deletedItem = e.detail.item;
    setFiles(prev => prev.filter(f => f.fileName !== deletedItem.fileName));
  };

  return (
    <>
      <UploadCollection onRename={handleUploadCollectionRename} onItemDelete={handleUploadCollectionItemDelete}>
            <div slot="header" className="header">
                <Title>Attachments ({files.length})</Title>
            </div>

            {files.map((file) => (
              <UploadCollectionItem key={file.id} fileName={file.fileName} fileNameClickable={file.fileNameClickable || false} uploadState={file.uploadState} type={file.type}>
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
