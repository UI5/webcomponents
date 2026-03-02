import { createReactComponent } from "@ui5/webcomponents-base";
import UploadCollectionClass from "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import UploadCollectionItemClass from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const UploadCollection = createReactComponent(UploadCollectionClass);
const UploadCollectionItem = createReactComponent(UploadCollectionItemClass);
const Icon = createReactComponent(IconClass);
const Title = createReactComponent(TitleClass);

function App() {

  const handleRename = (e) => {
    alert("Rename e: " + e.target.fileName);
  };

  const handleUi5ItemDelete = (e) => {
    uploadCollection.removeChild(e.detail.item);
  };

  return (
    <>
      <UploadCollection>
            <div slot="header" className="header">
                <Title>Attachments (2)</Title>
            </div>

            <UploadCollectionItem file-name="LaptopHT-1000.jpg" file-name-clickable={true} upload-state="Complete" type="Detail">
                Uploaded By: David Keane · Uploaded On: 2014-07-26 · File Size: 35 KB
                <img src="/images/HT-1000.jpg" slot="thumbnail" />
            </UploadCollectionItem>

            <UploadCollectionItem file-name="Notes.txt" upload-state="Complete" type="Detail">
                Uploaded By: John Smith · Uploaded On: 2014-09-02 · File Size: 226.6 KB
                <Icon name="document-text" slot="thumbnail" />
            </UploadCollectionItem>
        </UploadCollection>
    </>
  );
}

export default App;
