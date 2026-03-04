import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";

const Link = createComponent(LinkClass);

function App() {

  return (
    <>
      <Link style={{ width: "8rem" }} href="https://www.sap.com" target="_blank">
            This is a really long link. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Link>

        <Link style={{ width: "8rem" }} href="https://www.sap.com" target="_blank" wrapping-type="None">
            This is a really long link. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Link>
    </>
  );
}

export default App;
