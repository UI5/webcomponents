import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";

const Input = createReactComponent(InputClass);

export const Example = () => {
  return (
    <>
      <style>{`
            ui5-input {
                width: 300px;
                color: darkorange;
                background-color: #ffeded;
            }
        `}</style>
      <Input value="Styled input" />
    </>
  );
}
