import { createReactComponent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  const handleLoadMore = () => {
    growingList.loading = true;
    
    setTimeout(() => {
        insertItems(growingList);
        growingList.loading = false;
  };

  return (
    <>
      <List style={{ height: "300px" }} id="growingList" growing="Button" loading-delay={0}>
            <ListItemStandard icon="nutrition-activity" description="Tropical plant with an edible fruit" additional-text="In-stock" additional-text-state="Positive">Pineapple</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="Occurs between red and yellow" additional-text="Expires" additional-text-state="Critical">Orange</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="The yellow lengthy fruit" additional-text="Re-stock" additional-text-state="Negative">Banana</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="Small fruit that comes in various colors, including red, purple" additional-text="Re-stock" additional-text-state="Information">Plum</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description=" tropical fruit known for its sweet and juicy interior" additional-text="Re-stock" additional-text-state="Negative">Mango</ListItemStandard>
        </List>
    </>
  );
}

export default App;
