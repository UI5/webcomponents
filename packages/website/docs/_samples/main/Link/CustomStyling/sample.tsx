import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";

const Link = createComponent(LinkClass);

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
