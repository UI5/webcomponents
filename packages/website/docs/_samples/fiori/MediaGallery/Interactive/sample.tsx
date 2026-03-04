import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useRef } from "react";
import MediaGalleryClass from "@ui5/webcomponents-fiori/dist/MediaGallery.js";
import MediaGalleryItemClass from "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const MediaGallery = createComponent(MediaGalleryClass);
const MediaGalleryItem = createComponent(MediaGalleryItemClass);
const Bar = createComponent(BarClass);
const Button = createComponent(ButtonClass);
const Dialog = createComponent(DialogClass);
const Label = createComponent(LabelClass);
const Title = createComponent(TitleClass);

function App() {
  const mediaGalleryDialogRef = useRef(null);

  const handleCloseDialogButtonClick = () => {
    mediaGalleryDialogRef.current!.open = false;
  };

  const handleMediaGalleryOverflowClick = () => {
    mediaGalleryDialogRef.current!.open = true;
  };

  const handleMediaGalleryDisplayAreaClick = () => {
    mediaGalleryDialogRef.current!.open = true;
  };

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

        @media (min-width: 612px) {
            .container {
                display: grid;
                gap: 1rem;
                grid-template-columns: 1fr 1fr;
            }
        }

        .details {
            background: var(--sapBaseColor);
            padding: 1rem;
            color: var(--sapTextColor);
        }

        .dialog-footer {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            padding: 0px 0.5rem 0px 0px;
        }
      `}</style>
      <div className="container">
            <MediaGallery interactiveDisplayArea={true}>
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

            <div className="details">
                <Title level="H4">Item Details</Title>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                quam lectus, tristique semper mi et, faucibus viverra metus.
                Quisque nec venenatis massa. Ut eu dolor a justo ornare feugiat.
                Morbi congue diam id enim porttitor, sit amet placerat nunc
                pulvinar. Vivamus eu feugiat justo. Ut eu lectus mauris. Aliquam
                erat volutpat. Vestibulum et enim sit amet ipsum tincidunt
                aliquet nec in dui. Sed dui est, hendrerit non sollicitudin
                quis, venenatis vel libero. Suspendisse sit amet lorem posuere,
                egestas neque eget, sodales ipsum. Donec sollicitudin leo ut
                risus tincidunt tincidunt. Ut vel nisl nisl. Cras leo odio,
                viverra a ante nec, cursus volutpat lectus. Cras ac metus nisi.
                Aliquam fermentum nec felis sit amet tristique. Nunc luctus a
                lacus non semper. Curabitur euismod tellus id massa mattis, in
                consectetur mi luctus. Mauris dignissim efficitur lobortis.
                Etiam sit amet nunc commodo, lacinia nisi sagittis, finibus
                nulla. Proin quis elementum eros. Ut facilisis lacinia viverra.
            </div>
        </div>

        <Dialog ref={mediaGalleryDialogRef} id="mediaGalleryDialog" headerText="Item" stretch={true}>
            <Bar design="Header" slot="header">
                <Label>Item</Label>
            </Bar>
            <MediaGallery showAllThumbnails={true}>
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
            <div slot="footer" className="dialog-footer">
                <div style={{ flex: 1 }}></div>
                <Button id="closeDialogButton" onClick={handleCloseDialogButtonClick}>Close</Button>
            </div>
        </Dialog>
    </>
  );
}

export default App;
