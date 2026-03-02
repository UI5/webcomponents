import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents-fiori/dist/Bar.js";
import MediaGalleryClass from "@ui5/webcomponents-fiori/dist/MediaGallery.js";
import MediaGalleryItemClass from "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Bar = createReactComponent(BarClass);
const MediaGallery = createReactComponent(MediaGalleryClass);
const MediaGalleryItem = createReactComponent(MediaGalleryItemClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Label = createReactComponent(LabelClass);
const Title = createReactComponent(TitleClass);

function App() {

  const handleClick = () => {
    mediaGalleryDialog.open = false;
  };

  const handleOverflowClick = () => {
    mediaGalleryDialog.open = true;
  };

  const handleDisplayAreaClick = () => {
    mediaGalleryDialog.open = true;
  };

  return (
    <>
      <div className="container">
            <MediaGallery interactive-display-area={true}>
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
        </div>

        <Dialog id="mediaGalleryDialog" header-text="Item" stretch={true}>
            <Bar design="Header" slot="header">
                <Label>Item</Label>
            </Bar>
            <MediaGallery show-all-thumbnails={true}>
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
                <Button id="closeDialogButton">Close</Button>
            </div>
        </Dialog>
    </>
  );
}

export default App;
