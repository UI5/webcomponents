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
                </MediaGalleryItem>
                <MediaGalleryItem>
                    <img src="/images/HT-1010.jpg" />
                </MediaGalleryItem>
                <MediaGalleryItem>
                    <img src="/images/HT-1022.jpg" />
                </MediaGalleryItem>
                <MediaGalleryItem>
                    <img src="/images/HT-1030.jpg" />
                </MediaGalleryItem>
                <MediaGalleryItem>
                    <img src="/images/HT-2002.jpg" />
                </MediaGalleryItem>
                <MediaGalleryItem>
                    <img src="/images/HT-2026.jpg" />
                </MediaGalleryItem>
            </MediaGallery>
    </>
  );
}

export default App;
