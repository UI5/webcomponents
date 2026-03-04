import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useRef } from "react";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
import "@ui5/webcomponents-icons/dist/filter.js";

const Search = createReactComponent(SearchClass);
const Button = createReactComponent(ButtonClass);
const Toast = createReactComponent(ToastClass);

function App() {
  const toastRef = useRef(null);

  const handleAdvancedButtonClick = () => {
    toastRef.current!.open = true;
  };

  return (
    <>
      <Search id="advancedFiltering" placeholder="Start typing ...">
    		<Button id="advancedButton" slot="filterButton" icon="sap-icon://filter" onClick={handleAdvancedButtonClick} />
    	</Search>
    	<Toast ref={toastRef} id="advancedFilterToast" placement="BottomCenter">Search refined using advanced filters</Toast>
    </>
  );
}

export default App;
