import { createReactComponent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/nutrition-activity.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <style>{`
        .scrollContainer {
        	height: 300px;
        	overflow: auto;
        }

        .heading {
        	margin: 2rem 0 2rem 1rem;
        }
      `}</style>
      <div className="scrollContainer">
            <Title size="H3" class="heading">Scroll down to see the sticky header in action</Title>
            <List headerText="Sticky Header" stickyHeader={true}>
                <ListItemStandard icon="nutrition-activity" description="Tropical plant with an edible fruit" additionalText="In-stock" additionalTextState="Positive">Pineapple</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="Occurs between red and yellow" additionalText="Expires" additionalTextState="Critical">Orange</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="The yellow lengthy fruit" additionalText="Re-stock" additionalTextState="Information">Blueberry</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="The tropical stone fruit" additionalText="Re-stock" additionalTextState="Negative">Mango</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A sweet red or green pomaceous fruit" additionalText="In-stock" additionalTextState="Positive">Apple</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A long curved fruit with soft sweet flesh" additionalText="Expires" additionalTextState="Critical">Banana</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A small red fruit with seeds on the outside" additionalText="In-stock" additionalTextState="Positive">Strawberry</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A small juicy fruit growing in clusters" additionalText="Re-stock" additionalTextState="Information">Grape</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A tropical fruit with orange flesh and black seeds" additionalText="Re-stock" additionalTextState="Negative">Papaya</ListItemStandard>
                <ListItemStandard icon="nutrition-activity" description="A small brown fruit with bright green flesh" additionalText="In-stock" additionalTextState="Positive">Kiwi</ListItemStandard>
            </List>
        </div>
    </>
  );
}

export default App;
