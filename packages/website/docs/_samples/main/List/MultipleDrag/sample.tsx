import { createReactComponent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  const handleUi5SelectionChange = () => {
    updateSelectionCount(listIndex);
  };

  return (
    <>
      <div className="demo-container">
            <!-- List with multiple selection -->
            <div className="demo-section">
                <div className="info">
                    Selected: <span id="count1" className="selected-count">0</span> items<br />
                    Select multiple items and drag to move them together
                </div>
            
                <List id="list1" header-text="My Tasks" selection-mode="Multiple">
                    <ListItemStandard movable={true} icon="task" data-id={1}>Review design mockups</ListItemStandard>
                    <ListItemStandard movable={true} icon="task" data-id={2}>Update documentation</ListItemStandard>
                    <ListItemStandard movable={true} icon="task" data-id={3}>Fix bug #123</ListItemStandard>
                    <ListItemStandard movable={true} icon="task" data-id={4}>Prepare demo</ListItemStandard>
                    <ListItemStandard movable={true} icon="task" data-id={5}>Test new feature</ListItemStandard>
                </List>
            </div>

            <!-- Second list for cross-list dragging -->
            <div className="demo-section">
                <div className="info">
                    Selected: <span id="count2" className="selected-count">0</span> items<br />
                    Drag items from the left list here
                </div>
            
                <List id="list2" header-text="Done" selection-mode="Multiple">
                    <ListItemStandard movable={true} icon="accept" data-id={6}>Write unit tests</ListItemStandard>
                    <ListItemStandard movable={true} icon="accept" data-id={7}>Code review</ListItemStandard>
                </List>
            </div>
        </div>
    </>
  );
}

export default App;
