import { createReactComponent } from "@ui5/webcomponents-base";
import MediaGalleryClass from "@ui5/webcomponents-fiori/dist/MediaGallery.js";
import MediaGalleryItemClass from "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";

const MediaGallery = createReactComponent(MediaGalleryClass);
const MediaGalleryItem = createReactComponent(MediaGalleryItemClass);

function App() {

  return (
    <>
      <MediaGallery layout="Horizontal" show-all-thumbnails={true} menu-horizontal-align="Right">
            <MediaGalleryItem>
                <img src="/images/HT-1000.jpg" />
                <img src="/images/HT-1000-small.jpg" slot="thumbnail" />
            </MediaGalleryItem>
        </MediaGallery>
    </>
  );
}

export default App;
