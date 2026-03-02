import { createReactComponent } from "@ui5/webcomponents-base";
import IconClass from "@ui5/webcomponents/dist/Icon.js";

const Icon = createReactComponent(IconClass);

function App() {

  return (
    <>
      <Icon name="da-2" design="Default" />
        <Icon name="da-2" design="Contrast" />
        <Icon name="da-2" design="Critical" />
        <Icon name="da-2" design="Negative" />
        <Icon name="da-2" design="Positive" />
        <Icon name="da-2" design="Information" />
        <Icon name="da-2" design="Neutral" />
        <Icon name="da-2" design="NonInteractive" />
    </>
  );
}

export default App;
