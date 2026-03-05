import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import MediaGalleryClass from "@ui5/webcomponents-fiori/dist/MediaGallery.js";
import MediaGalleryItemClass from "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";

const MediaGallery = createComponent(MediaGalleryClass);
const MediaGalleryItem = createComponent(MediaGalleryItemClass);

function App() {
  return (
    <>
      <style>{`
        ui5-media-gallery-item:not(:defined) {
            visibility: hidden;
        }

        @media (min-width: 600px) {
            ui5-media-gallery {
                height: 50rem;
            }
        }
      `}</style>
      <MediaGallery layout="Horizontal">
        <MediaGalleryItem>
          <img src="/images/HT-1000.jpg" alt="Product" />
        </MediaGalleryItem>
        <MediaGalleryItem selected={true}>
          <img src="/images/HT-1010.jpg" alt="Product" />
        </MediaGalleryItem>
      </MediaGallery>
    </>
  );
}

export default App;
