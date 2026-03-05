import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";

const Link = createComponent(LinkClass);

function App() {
  return (
    <>
      <Link design="Emphasized" href="https://www.sap.com" target="_blank">
        Emphasized Link
      </Link>

      <Link design="Subtle" href="https://www.sap.com" target="_blank">
        Subtle Link
      </Link>

      <Link design="Default" href="https://www.sap.com" target="_blank">
        Default Link
      </Link>
    </>
  );
}

export default App;
