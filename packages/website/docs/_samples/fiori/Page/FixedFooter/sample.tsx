import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import PageClass from "@ui5/webcomponents-fiori/dist/Page.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";

const Page = createReactComponent(PageClass);
const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Label = createReactComponent(LabelClass);

function App() {

  return (
    <>
      <Page style={{ height: "500px" }} background-design="Transparent">
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
                    libero nunc consequat. Ac orci phasellus egestas tellus. Quis imperdiet massa tincidunt nunc. Mollis
                    nunc sed id semper risus in hendrerit gravida rutrum.
                </p>
                <p className="content-paragraph">
                    Amet consectetur adipiscing elit duis tristique. Tortor condimentum lacinia quis vel eros. Elit sed
                    vulputate mi sit amet mauris commodo quis imperdiet. Sed nisi lacus sed viverra tellus in hac habitasse.
                    Praesent tristique magna sit amet purus gravida quis blandit. Magnis dis parturient montes nascetur
                    ridiculus. Sit amet nulla facilisi morbi tempus iaculis urna id. Senectus et netus et malesuada fames.
                    Faucibus ornare suspendisse sed nisi lacus sed. Facilisis volutpat est velit egestas dui id ornare arcu
                    odio. In tellus integer feugiat scelerisque. Eu turpis egestas pretium aenean pharetra magna. Integer
                    enim neque volutpat ac tincidunt vitae semper quis lectus. Euismod elementum nisi quis eleifend quam
                    adipiscing vitae proin sagittis. Ante in nibh mauris cursus mattis. Sagittis vitae et leo duis.
                </p>
                <p className="content-paragraph">
                    Sodales ut eu sem integer. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Tellus rutrum
                    tellus pellentesque eu tincidunt tortor. Etiam tempor orci eu lobortis elementum nibh. Velit laoreet id
                    donec ultrices tincidunt arcu non sodales. Scelerisque felis imperdiet proin fermentum leo vel orci
                    porta non. Odio ut sem nulla pharetra diam sit amet nisl. Semper auctor neque vitae tempus quam
                    pellentesque nec nam aliquam. Donec enim diam vulputate ut pharetra sit. Posuere ac ut consequat semper
                    viverra nam libero. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Aliquam eleifend
                    mi in nulla posuere sollicitudin aliquam ultrices. Ac placerat vestibulum lectus mauris ultrices.
                </p>
                <p className="content-paragraph">
                    Consequat semper viverra nam libero justo laoreet. In mollis nunc sed id. Eget egestas purus viverra
                    accumsan in. Diam vulputate ut pharetra sit amet aliquam. Arcu bibendum at varius vel pharetra vel
                    turpis nunc. Lacus sed turpis tincidunt id aliquet risus feugiat. Tempus urna et pharetra pharetra massa
                    massa. Volutpat maecenas volutpat blandit aliquam etiam. Viverra suspendisse potenti nullam ac. Nisl
                    purus in mollis nunc sed id. Nibh mauris cursus mattis molestie a iaculis at erat. Ultricies leo integer
                    malesuada nunc vel risus commodo viverra maecenas. Tempor id eu nisl nunc mi ipsum faucibus vitae. Eget
                    lorem dolor sed viverra. Pellentesque habitant morbi tristique senectus et. Et tortor at risus viverra
                    adipiscing at in tellus.
                </p>
                <p className="content-paragraph">
                    Venenatis lectus magna fringilla urna. Sed cras ornare arcu dui vivamus arcu felis. Gravida dictum fusce
                    ut placerat orci nulla pellentesque dignissim. Aliquam purus sit amet luctus venenatis lectus magna
                    fringilla urna. Arcu dictum varius duis at consectetur lorem donec. Tortor posuere ac ut consequat
                    semper viverra nam. Vulputate mi sit amet mauris commodo quis. Convallis convallis tellus id interdum
                    velit. Ac placerat vestibulum lectus mauris ultrices eros. Nulla at volutpat diam ut venenatis tellus.
                </p>
                <p className="content-paragraph">
                    Facilisi nullam vehicula ipsum a arcu cursus vitae. Massa sapien faucibus et molestie ac. Viverra ipsum
                    nunc aliquet bibendum enim facilisis gravida. Sit amet massa vitae tortor condimentum lacinia. Sit amet
                    risus nullam eget felis. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Consequat mauris
                    nunc congue nisi vitae suscipit tellus mauris a. Tellus at urna condimentum mattis pellentesque id nibh
                    tortor. Sagittis eu volutpat odio facilisis mauris sit amet massa vitae. Magna etiam tempor orci eu
                    lobortis elementum nibh tellus. Volutpat ac tincidunt vitae semper quis. Diam vel quam elementum
                    pulvinar etiam non quam lacus suspendisse. Id leo in vitae turpis massa sed elementum tempus. Convallis
                    tellus id interdum velit laoreet id donec ultrices. Ac turpis egestas maecenas pharetra convallis
                    posuere morbi leo. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Amet cursus
                    sit amet dictum sit amet justo donec. Habitant morbi tristique senectus et netus.
                </p>
            </div>
            <div slot="footer">
                <Bar design="FloatingFooter">
                    <Button design="Positive" slot="endContent">Agree</Button>
                    <Button design="Negative" slot="endContent">Decline</Button>
                    <Button design="Transparent" slot="endContent">Cancel</Button>
                </Bar>
            </div>
        </Page>
    </>
  );
}

export default App;
