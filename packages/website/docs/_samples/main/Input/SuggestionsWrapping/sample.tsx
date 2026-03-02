import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";

const Input = createReactComponent(InputClass);
const SuggestionItem = createReactComponent(SuggestionItemClass);

function App() {

  return (
    <>
      <Input placeholder="Type something" show-suggestions={true}>
            <SuggestionItem text="Wireless DSL/ Repeater and Print Server Lorem ipsum dolar st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor incidunt ut labore et dolore magna aliquyam erat, diam nonumy eirmod tempor individunt ut labore et dolore magna aliquyam erat, sed justo et ea rebum." />
            <SuggestionItem text="Widescreen Portable DVD Player w MP3, consetetur sadipscing, sed diam nonumy eirmod tempor invidunt ut labore et dolore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergen, no sea takimata. Tortor pretium viverra suspendisse potenti nullam. Congue quisque egestas diam in arcu cursus.Rutrum tellus pellentesque eu tincidunt tortor. Nec tincidunt praesent semper feugiat nibh sed" />
            <SuggestionItem text="Portable DVD Player with 9 inches LCD Monitor" />
        </Input>
    </>
  );
}

export default App;
