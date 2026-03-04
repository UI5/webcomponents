import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import MediaGalleryClass from "@ui5/webcomponents-fiori/dist/MediaGallery.js";
import MediaGalleryItemClass from "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";

const MediaGallery = createReactComponent(MediaGalleryClass);
const MediaGalleryItem = createReactComponent(MediaGalleryItemClass);

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
                <img src="/images/HT-1000.jpg" />
            </MediaGalleryItem>
            <MediaGalleryItem selected={true}>
                <img src="/images/HT-1010.jpg" />
            </MediaGalleryItem>
        </MediaGallery>
    </>
  );
}

export default App;
