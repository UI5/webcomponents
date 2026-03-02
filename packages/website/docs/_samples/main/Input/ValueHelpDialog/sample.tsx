import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Icon = createReactComponent(IconClass);
const Input = createReactComponent(InputClass);
const List = createReactComponent(ListClass);
const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <Input id="valueHelpInput" placeholder="Enter product" show-suggestions={true}>
            <Icon id="valueHelpIcon" slot="icon" name="value-help" />
        </Input>

        <Dialog id="dialog">
            <!--Dialog Header -->
            <div slot="header" style={{ width: "100%", padding: "1rem" }}>
                <Title level="H4">Products</Title>
                <Input style={{ width: "100%", margin: "1rem 0" }} id="dialogSearchInput" placeholder="Search">
                    <Icon id="dialogSearchIcon" slot="icon" name="search" />
                </Input>
            </div>
            <!-- Dialog Content -->
            <List style={{ minWidth: "500px" }} id="itemsList" no-data-text="No data" />

            <!-- Dialog Footer -->
            <div slot="footer" id="footer">
                <Button design="Transparent" id="cancelButton">Cancel</Button>
            </div>
        </Dialog>
    </>
  );
}

export default App;
