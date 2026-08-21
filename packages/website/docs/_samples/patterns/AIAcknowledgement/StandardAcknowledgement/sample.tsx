import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState, useCallback } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Button = createReactComponent(ButtonClass);
const CheckBox = createReactComponent(CheckBoxClass);
const Dialog = createReactComponent(DialogClass);
const Link = createReactComponent(LinkClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);

function App() {
  const [dialogOpen, setDialogOpen] = useState(true);

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <>
      <Dialog open={dialogOpen} state="Information" headerText="Information">
        <br />
        <Text>
          [ &lt;Application Help&gt; ] now provides embedded AI ("Artificial
          Intelligence") services. For more information, see{" "}
          <Link href="https://www.sap.com" target="_blank">
            &lt;link&gt;
          </Link>
          .
        </Text>
        <br />
        <Title level="H5">Disclaimer</Title>
        <br />
        <Text>
          Artificial Intelligence (AI) generates results based on multiple
          sources. Outputs may contain errors and inaccuracies. Consider
          reviewing all generated results and adjust as necessary.
        </Text>
        <br />
        <CheckBox
          style={{ marginInlineStart: "-0.625rem" }}
          text="Don't show this message again"
        />
        <div
          slot="footer"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <Button design="Emphasized" onClick={handleDialogClose}>
            OK
          </Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </div>
      </Dialog>
    </>
  );
}

export default App;
