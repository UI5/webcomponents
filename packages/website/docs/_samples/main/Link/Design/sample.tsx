import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";

const Link = createReactComponent(LinkClass);

export const Example = () => {
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
