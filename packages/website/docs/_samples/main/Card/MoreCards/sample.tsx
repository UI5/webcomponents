import { createReactComponent } from "@ui5/webcomponents-base";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/competitor.js";
import "@ui5/webcomponents-icons/dist/wallet.js";
import "@ui5/webcomponents-icons/dist/collaborate.js";

const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Label = createReactComponent(LabelClass);
const Link = createReactComponent(LinkClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <style>{`
        .content,
        .content-group {
            display: flex;
            flex-direction: column;
            padding-block-end: 1rem;
        }
        .content-padding {
            padding: 0.5rem 1rem 0 1rem;
            box-sizing: border-box;
        }
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, 22rem);
            grid-auto-rows: 1fr;
            gap: 1rem;
        }
      `}</style>
      <Card>
                <CardHeader slot="header" titleText="Donna Maria Moore" subtitleText="Senior Sales Executive">
                    <img src="/images/avatars/man_avatar_1.png" slot="avatar" />
                </CardHeader>
                <div className="content content-padding">
                    <Title style={{ paddingBlockEnd: "1rem" }} level="H5">Contact details</Title>
                    <div className="content-group">
                        <Label showColon={true}>Company Name</Label>
                        <Text>Company A</Text>
                    </div>
                    <div className="content-group">
                        <Label showColon={true}>Address</Label>
                        <Text>481 West Street, Anytown 45066, USA</Text>
                    </div>
                    <div className="content-group">
                        <Label showColon={true}>Website</Label>
                        <Link target="_blank">www.company_a.example.com</Link>
                    </div>
                </div>
            </Card>
    </>
  );
}

export default App;
