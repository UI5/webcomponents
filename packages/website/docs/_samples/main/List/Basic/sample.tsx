import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/nutrition-activity.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  return (
    <>
      <List>
            <ListItemStandard icon="nutrition-activity" description="Tropical plant with an edible fruit" additionalText="In-stock" additionalTextState="Positive">Pineapple</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="Occurs between red and yellow" additionalText="Expires" additionalTextState="Critical">Orange</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="The yellow lengthy fruit" additionalText="Re-stock" additionalTextState="Information">Blueberry</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="The tropical stone fruit" additionalText="Re-stock" additionalTextState="Negative">Mango</ListItemStandard>
        </List>
    </>
  );
}

export default App;
