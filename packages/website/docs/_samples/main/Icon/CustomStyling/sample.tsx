import { createReactComponent } from "@ui5/webcomponents-base";
import IconClass from "@ui5/webcomponents/dist/Icon.js";

const Icon = createReactComponent(IconClass);

function App() {

  return (
    <>
      <Icon style={{ width: "2rem", height: "2rem", color: "blueviolet" }} name="home"
         />
    
        <Icon style={{ width: "2rem", height: "2rem", color: "orangered" }} name="ai"
         />

        <Icon style={{ width: "2rem", height: "2rem", color: "orange" }} name="da-2"
         />

        <Icon style={{ width: "2rem", height: "2rem", color: "red" }} name="heart"
         />

        <Icon style={{ width: "2rem", height: "2rem", color: "olivedrab" }} name="activities"
         />
    </>
  );
}

export default App;
