import { createReactComponent } from "@ui5/webcomponents-base";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";

const Search = createReactComponent(SearchClass);
const Button = createReactComponent(ButtonClass);
const Toast = createReactComponent(ToastClass);

function App() {

  const handleClick = () => {
    toast.open = true;
  };

  return (
    <>
      <Search id="advancedFiltering" placeholder="Start typing ...">
    		<Button id="advancedButton" slot="filterButton" icon="sap-icon://filter" />
    	</Search>
    	<Toast id="advancedFilterToast" placement="BottomCenter">Search refined using advanced filters</Toast>
    </>
  );
}

export default App;
