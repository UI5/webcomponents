import { createReactComponent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/nutrition-activity.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  return (
    <>
      <List>
            <ListItemStandard icon="nutrition-activity" description="Tropical plant with an edible fruit" additional-text="In-stock" additional-text-state="Positive">Pineapple</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="Occurs between red and yellow" additional-text="Expires" additional-text-state="Critical">Orange</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="The yellow lengthy fruit" additional-text="Re-stock" additional-text-state="Information">Blueberry</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="The tropical stone fruit" additional-text="Re-stock" additional-text-state="Negative">Mango</ListItemStandard>
        </List>
    </>
  );
}

export default App;
