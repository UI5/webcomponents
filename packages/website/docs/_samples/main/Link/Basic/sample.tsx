import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";

const Link = createReactComponent(LinkClass);

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
