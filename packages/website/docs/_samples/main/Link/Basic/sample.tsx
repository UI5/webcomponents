import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";

const Link = createComponent(LinkClass);

function App() {
  return (
    <>
      <Link href="https://www.sap.com" target="_blank">
        Standard Link
      </Link>
      <Link href="https://www.sap.com" target="_blank" disabled={true}>
        Standard Link
      </Link>
    </>
  );
}

export default App;
