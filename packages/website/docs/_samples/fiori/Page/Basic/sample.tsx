import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents-fiori/dist/Bar.js";
import PageClass from "@ui5/webcomponents-fiori/dist/Page.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Bar = createReactComponent(BarClass);
const Page = createReactComponent(PageClass);
const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);

function App() {

  return (
    <>
      <Page style={{ height: "500px" }} background-design="Solid">
            <Bar design="Header" slot="header">
                <Button design="Transparent" icon="home" tooltip="Go home" slot="startContent" />
                <Label slot="startContent">Title</Label>
                <Button design="Transparent" icon="action-settings" tooltip="Go to settings" slot="endContent" />
            </Bar>
            <div>
                <p className="content-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Turpis massa sed elementum tempus egestas sed sed risus pretium. Eget nullam non
                    nisi est sit amet facilisis. Imperdiet dui accumsan sit amet nulla facilisi morbi. Sem viverra aliquet
                    eget sit amet tellus cras adipiscing. Faucibus purus in massa tempor nec. Egestas quis ipsum suspendisse
                    ultrices gravida dictum. Amet facilisis magna etiam tempor. Sapien et ligula ullamcorper malesuada proin
                    libero nunc consequat. Ac orci phasellus egestas tellus. Quis imperdiet massa tincidunt nunc.
                </p>
                <p className="content-paragraph">
                    Amet consectetur adipiscing elit duis tristique. Tortor condimentum lacinia quis vel eros. Elit sed
                    vulputate mi sit amet mauris commodo quis imperdiet. Sed nisi lacus sed viverra tellus in hac habitasse.
                    Praesent tristique magna sit amet purus gravida quis blandit. Magnis dis parturient montes nascetur
                    ridiculus. Sit amet nulla facilisi morbi tempus iaculis urna id. Senectus et netus et malesuada fames.
                    Faucibus ornare suspendisse sed nisi lacus sed. Facilisis volutpat est velit egestas dui id ornare arcu
                    odio. In tellus integer feugiat scelerisque. Eu turpis egestas pretium aenean pharetra magna. Integer
                    enim neque volutpat ac tincidunt vitae semper quis lectus.
                </p>
                <p className="content-paragraph">
                    Sodales ut eu sem integer. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Tellus rutrum
                    tellus pellentesque eu tincidunt tortor. Etiam tempor orci eu lobortis elementum nibh. Velit laoreet id
                    donec ultrices tincidunt arcu non sodales. Scelerisque felis imperdiet proin fermentum leo vel orci
                    porta non. Odio ut sem nulla pharetra diam sit amet nisl. Semper auctor neque vitae tempus quam
                    pellentesque nec nam aliquam. Donec enim diam vulputate ut pharetra sit. Posuere ac ut consequat semper
                    viverra nam libero. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Aliquam eleifend
                    mi in nulla posuere sollicitudin aliquam ultrices.
                </p>
            </div>
            <Bar design="FloatingFooter" slot="footer">
                <Button design="Positive" slot="endContent">Agree</Button>
                <Button design="Negative" slot="endContent">Decline</Button>
                <Button design="Transparent" slot="endContent">Cancel</Button>
            </Bar>
        </Page>
    </>
  );
}

export default App;
