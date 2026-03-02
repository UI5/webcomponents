import { createReactComponent } from "@ui5/webcomponents-base";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ListClass from "@ui5/webcomponents/dist/List.js";

const BusyIndicator = createReactComponent(BusyIndicatorClass);
const Button = createReactComponent(ButtonClass);
const List = createReactComponent(ListClass);

function App() {

  const handleClick = () => {
    busyIndicator.active = true;

    setTimeout(() => {
        ["UI5", "Web", "Components"].forEach(title => {
            const el = document.createElement("ui5-li");
            el.textContent = title;
            list.appendChild(el);
  };

  return (
    <>
      <div className="sample">
            <Button>Fetch List Data</Button>
            <BusyIndicator>
                <List no-data-text="No Data" header-text="Available Items" />
            </BusyIndicator>
        </div>
    </>
  );
}

export default App;
