import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState } from "react";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/decline.js";

const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Title = createReactComponent(TitleClass);

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStateOpen, setDialogStateOpen] = useState(false);

  return (
    <>
      <style>{`
        /* Styles for Dialog */
        #dialog::part(header),
        #dialog::part(footer) {
            padding-inline: 0;
        }

        /* Styles for Dialog with State */
        #dialogState::part(header),
        #dialogState::part(footer) {
            padding-inline-end: 0;
        }

        #bar::part(startContent) {
            padding-inline-start: 0;
        }
      `}</style>
      <Button id="dialogOpener" onClick={() => setDialogOpen(true)}>
        Open Dialog
      </Button>

      <Dialog
        open={dialogOpen}
        id="dialog"
        onClose={() => setDialogOpen(false)}
      >
        <Bar slot="header" design="Header">
          <Title level="H5" slot="startContent">
            Bar used in Header and Footer
          </Title>
          <Button
            class="dialogCloser"
            design="Transparent"
            slot="endContent"
            icon="decline"
            onClick={() => setDialogOpen(false)}
          />
        </Bar>
        <div>
          Custom styles are applied to remove the default Dialog's paddings when
          ui5-bar is placed in the header or footer of a dialog.
        </div>
        <Bar slot="footer" design="Footer">
          <Button
            style={{ minWidth: "4rem" }}
            class="dialogCloser"
            design="Emphasized"
            slot="endContent"
            onClick={() => setDialogOpen(false)}
          >
            OK
          </Button>
        </Bar>
      </Dialog>

      <Button id="dialogStateOpener" onClick={() => setDialogStateOpen(true)}>
        Open Dialog with State
      </Button>

      <Dialog
        open={dialogStateOpen}
        id="dialogState"
        state="Critical"
        onClose={() => setDialogStateOpen(false)}
      >
        <Bar id="bar" slot="header" design="Header">
          <Title level="H5" slot="startContent">
            Bar used in Header and Footer
          </Title>
        </Bar>
        <div>
          Custom styles are applied to adjust the paddings when a ui5-bar is
          placed in the header or footer of a dialog with state.
        </div>
        <Bar slot="footer" design="Footer">
          <Button
            style={{ minWidth: "4rem" }}
            design="Emphasized"
            id="closeDialogStateButton"
            slot="endContent"
            onClick={() => setDialogStateOpen(false)}
          >
            OK
          </Button>
        </Bar>
      </Dialog>
    </>
  );
}

export default App;
