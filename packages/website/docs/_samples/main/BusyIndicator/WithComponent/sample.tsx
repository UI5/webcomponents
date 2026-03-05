import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";

const BusyIndicator = createComponent(BusyIndicatorClass);
const Button = createComponent(ButtonClass);
const List = createComponent(ListClass);
const ListItemStandard = createComponent(ListItemStandardClass);

function App() {
  const [busy, setBusy] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  const handleFetchBtnClick = () => {
    setBusy(true);

    setTimeout(() => {
      setItems(prev => [...prev, "UI5", "Web", "Components"]);
      setBusy(false);
    }, 3000);
  };

  return (
    <>
      <style>{`
        .sample {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
      `}</style>
      <div className="sample">
            <Button onClick={handleFetchBtnClick}>Fetch List Data</Button>
            <BusyIndicator active={busy}>
                <List noDataText="No Data" headerText="Available Items">
                    {items.map((title, index) => (
                        <ListItemStandard key={index}>{title}</ListItemStandard>
                    ))}
                </List>
            </BusyIndicator>
        </div>
    </>
  );
}

export default App;
