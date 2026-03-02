import { createReactComponent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <div className="scrollContainer">
            <Title size="H3" className="heading">Scroll down to see the sticky header in action</Title>
            <List header-text="Sticky Header" sticky-header={true}>
                <ListItemStandard icon="nutrition-activity" description="Tropical plant with an edible fruit" additional-text="In-stock" additional-text-state="Positive">Pineapple</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="Occurs between red and yellow" additional-text="Expires" additional-text-state="Critical">Orange</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="The yellow lengthy fruit" additional-text="Re-stock" additional-text-state="Information">Blueberry</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="The tropical stone fruit" additional-text="Re-stock" additional-text-state="Negative">Mango</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A sweet red or green pomaceous fruit" additional-text="In-stock" additional-text-state="Positive">Apple</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A long curved fruit with soft sweet flesh" additional-text="Expires" additional-text-state="Critical">Banana</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A small red fruit with seeds on the outside" additional-text="In-stock" additional-text-state="Positive">Strawberry</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A small juicy fruit growing in clusters" additional-text="Re-stock" additional-text-state="Information">Grape</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A tropical fruit with orange flesh and black seeds" additional-text="Re-stock" additional-text-state="Negative">Papaya</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A small brown fruit with bright green flesh" additional-text="In-stock" additional-text-state="Positive">Kiwi</ListItemStandard>
            </List>
        </div>
    </>
  );
}

export default App;
