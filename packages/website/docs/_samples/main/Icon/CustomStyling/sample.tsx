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
      <Icon
        style={{ width: "2rem", height: "2rem", color: "blueviolet" }}
        name="home"
      />

      <Icon
        style={{ width: "2rem", height: "2rem", color: "orangered" }}
        name="ai"
      />

      <Icon
        style={{ width: "2rem", height: "2rem", color: "orange" }}
        name="da-2"
      />

      <Icon
        style={{ width: "2rem", height: "2rem", color: "red" }}
        name="heart"
      />

      <Icon
        style={{ width: "2rem", height: "2rem", color: "olivedrab" }}
        name="activities"
      />
    </>
  );
}

export default App;
