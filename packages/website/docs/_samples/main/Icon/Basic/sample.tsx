import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/activities.js";
import "@ui5/webcomponents-icons/dist/heart.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/da-2.js";

const Icon = createReactComponent(IconClass);

function App() {
  return (
    <>
      <Icon name="home" />
      <Icon name="ai" />
      <Icon name="da-2" />
      <Icon name="heart" />
      <Icon name="activities" />
    </>
  );
}

export default App;
