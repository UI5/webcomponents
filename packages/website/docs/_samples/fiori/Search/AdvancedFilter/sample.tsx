import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useState } from "react";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
import "@ui5/webcomponents-icons/dist/filter.js";

const Search = createComponent(SearchClass);
const Button = createComponent(ButtonClass);
const Toast = createComponent(ToastClass);

function App() {
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <>
      <Search id="advancedFiltering" placeholder="Start typing ...">
        <Button
          id="advancedButton"
          slot="filterButton"
          icon="filter"
          onClick={() => setToastOpen(true)}
        />
      </Search>
      <Toast
        open={toastOpen}
        id="advancedFilterToast"
        placement="BottomCenter"
        onClose={() => setToastOpen(false)}
      >
        Search refined using advanced filters
      </Toast>
    </>
  );
}

export default App;
