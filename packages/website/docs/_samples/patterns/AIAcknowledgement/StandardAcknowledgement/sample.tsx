import { createReactComponent } from "@ui5/webcomponents-base";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const Dialog = createReactComponent(DialogClass);
const Text = createReactComponent(TextClass);
const Link = createReactComponent(LinkClass);
const Title = createReactComponent(TitleClass);
const CheckBox = createReactComponent(CheckBoxClass);
const Button = createReactComponent(ButtonClass);

function App() {
  const dialogRef = useRef(null);

  return (
    <>
      <div style={{ width: "100%", height: "500px" }}>
            <!DOCTYPE html>
            <html lang="en">
            <head>
            	<meta charset="UTF-8" />
            	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
            	<title>Sample</title>
            </head>
            <body style={{ backgroundColor: "var(--sapBackgroundColor)", height: "500px" }}>
            	<Dialog id="dialog" ref={dialogRef} state="Information" headerText="Information">
            		<br />
            		<Text>
            			[ &lt;Application Help&gt; ] now provides embedded AI ("Artificial Intelligence") services. For more information, see <Link href="https://www.sap.com" target="_blank" />&lt;link&gt;</Link>.
            		</Text>
            		<br />
            		<Title level="H5">Disclaimer</Title>
            		<br />
            		<Text>Artificial Intelligence (AI) generates results based on multiple sources. Outputs may contain errors and inaccuracies. Consider reviewing all generated results and adjust as necessary.</Text>
            		<br />
            		<CheckBox style={{ marginInlineStart: "-0.625rem" }} text="Don't show this message again" />
            		<div slot="footer" style={{ display: "flex", justifyContent: "flex-end", width: "100%", alignItems: "center", gap: "0.25rem" }}>
            			<Button design="Emphasized" className="dialogCloser">OK</Button>
            			<Button className="dialogCloser">Cancel</Button>
            		</div>
            	</Dialog>
            	<script type="module" src="main.js"></script>
            </body>
            </html>
          </div>
    </>
  );
}

export default App;
