import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/cloud.js";

const Link = createReactComponent(LinkClass);

export const Example = () => {
  return (
    <>
      <Link href="https://www.sap.com" target="_blank" icon="employee">
        View Profile
      </Link>

      <br />

      <Link
        href="https://www.sap.com"
        target="_blank"
        wrappingType="Normal"
        endIcon="cloud"
      >
        Check the weather
      </Link>
    </>
  );
}
