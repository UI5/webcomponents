import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";

const Link = createReactComponent(LinkClass);

function App() {
  return (
    <>
      <Link
        style={{ fontSize: "1.25rem", color: "var(--sapNegativeColor)" }}
        href="https://www.sap.com"
        target="_blank"
      >
        Styled Link
      </Link>

      <Link
        style={{ fontSize: "1.25rem", color: "var(--sapPositiveColor)" }}
        href="https://www.sap.com"
        target="_blank"
      >
        Styled Link
      </Link>
    </>
  );
}

export default App;
