import { createReactComponent } from "@ui5/webcomponents-base";
import LinkClass from "@ui5/webcomponents/dist/Link.js";

const Link = createReactComponent(LinkClass);

function App() {

  return (
    <>
      <Link href="https://www.sap.com" target="_blank" icon="employee">
            View Profile
        </Link>

        <br />

        <Link href="https://www.sap.com" target="_blank" wrapping-type="Normal" end-icon="cloud">
            Check the weather
        </Link>
    </>
  );
}

export default App;
