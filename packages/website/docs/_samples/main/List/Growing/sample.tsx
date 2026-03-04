import { useState, useRef } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/nutrition-activity.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {
  const [extraItems, setExtraItems] = useState<Array<{ index: number }>>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const handleGrowingListLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setExtraItems((prev) => {
        const startIndex = prev.length;
        const newItems = [];
        for (let i = 0; i < 5; i++) {
          newItems.push({ index: startIndex + i });
        }
        return [...prev, ...newItems];
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <List ref={listRef} style={{ height: "300px" }} id="growingList" growing="Scroll" loading-delay={0} loading={loading} onLoadMore={handleGrowingListLoadMore}>
            <ListItemStandard icon="nutrition-activity" description="Tropical plant with an edible fruit" additional-text="In-stock" additional-text-state="Positive">Pineapple</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="Occurs between red and yellow" additional-text="Expires" additional-text-state="Critical">Orange</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="The yellow lengthy fruit" additional-text="Re-stock" additional-text-state="Negative">Banana</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description="Small fruit that comes in various colors, including red, purple" additional-text="Re-stock" additional-text-state="Information">Plum</ListItemStandard>
            <ListItemStandard icon="nutrition-activity" description=" tropical fruit known for its sweet and juicy interior" additional-text="Re-stock" additional-text-state="Negative">Mango</ListItemStandard>
            {extraItems.map((item) => (
              <ListItemStandard key={item.index} icon="nutrition-activity" description={`the description goes here ${item.index}`} additional-text="Available" additional-text-state="Positive">Fruit name</ListItemStandard>
            ))}
        </List>
    </>
  );
}

export default App;
