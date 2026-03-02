import { createReactComponent } from "@ui5/webcomponents-base";
import MediaGalleryClass from "@ui5/webcomponents-fiori/dist/MediaGallery.js";
import MediaGalleryItemClass from "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";

const MediaGallery = createReactComponent(MediaGalleryClass);
const MediaGalleryItem = createReactComponent(MediaGalleryItemClass);

function App() {

  return (
    <>
      <MediaGallery id="media-gallery">
            <MediaGalleryItem layout="Wide">
                <iframe src="https://www.youtube.com/embed/GxGZG2fv6Aw" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                <img src="/images/sap-logo-square.svg" slot="thumbnail" alt="SAP Video" />
            </MediaGalleryItem>
        </MediaGallery>
    </>
  );
}

export default App;
