import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import InputIconClass from "@ui5/webcomponents/dist/InputIcon.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/microphone.js";

const Input = createReactComponent(InputClass);
const InputIcon = createReactComponent(InputIconClass);

function App() {
  return (
    <>
      <Input value="Search term" showClearIcon={true} placeholder="Type to search...">
        <InputIcon slot="icon" name="search" accessibleName="Search" />
      </Input>

      <Input placeholder="Voice input...">
        <InputIcon slot="icon" name="microphone" accessibleName="Voice input" />
      </Input>

      <Input value="Multiple icons" showClearIcon={true}>
        <InputIcon slot="icon" name="search" accessibleName="Search" />
        <InputIcon slot="icon" name="microphone" accessibleName="Voice input" />
      </Input>
    </>
  );
}

export default App;
