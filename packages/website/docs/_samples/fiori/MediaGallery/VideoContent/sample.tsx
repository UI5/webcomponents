import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
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
      <MediaGallery id="media-gallery">
        <MediaGalleryItem layout="Wide">
          <iframe
            src="https://www.youtube.com/embed/GxGZG2fv6Aw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
          <img
            src="/images/sap-logo-square.svg"
            slot="thumbnail"
            alt="SAP Video"
          />
        </MediaGalleryItem>
      </MediaGallery>
    </>
  );
}

export default App;
