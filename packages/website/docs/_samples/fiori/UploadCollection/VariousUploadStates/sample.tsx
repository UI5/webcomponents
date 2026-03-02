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

  const handleRetry = (e) => {
    alert("Retry uploading: " + e.target.fileName);
  };

  const handleTerminate = (e) => {
    alert("Terminate uploading of: " + e.target.fileName);
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

            <UploadCollectionItem file-name="LaptopHT-1000.jpg" upload-state="Complete">
                uploadState="Complete"
                <img src="/images/HT-1000.jpg" slot="thumbnail" />
            </UploadCollectionItem>

            <UploadCollectionItem file-name="Laptop.jpg" upload-state="Uploading" type="Active" progress={37}>
                uploadState="Uploading"
                <img src="/images/HT-1000.jpg" slot="thumbnail" />
            </UploadCollectionItem>

            <UploadCollectionItem file-name="latest-reports.pdf" upload-state="Error" type="Active" progress={59}>
                uploadState="Error"
                <Icon name="document-text" slot="thumbnail" />
            </UploadCollectionItem>

            <UploadCollectionItem file-name="Notes.txt" upload-state="Ready">
                uploadState="Ready" (default)
                <Icon name="document-text" slot="thumbnail" />
            </UploadCollectionItem>
        </UploadCollection>
    </>
  );
}

export default App;
