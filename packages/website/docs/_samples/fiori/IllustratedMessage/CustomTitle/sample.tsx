import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const IllustratedMessage = createReactComponent(IllustratedMessageClass);
const Button = createReactComponent(ButtonClass);
const Link = createReactComponent(LinkClass);
const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <IllustratedMessage name="UnableToUpload">
            <Title slot="title" level="H1">Something went wrong</Title>
            <div slot="subtitle">
                Please try again or contact us at
                <Link>example@example.com</Link>
            </div>
            <Button icon="refresh">Try again</Button>
        </IllustratedMessage>
    </>
  );
}

export default App;
