import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";

const Input = createReactComponent(InputClass);

function App() {

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

export default App;
