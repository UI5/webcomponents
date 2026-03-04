import { createReactComponent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/map.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  return (
    <>
      <List selection-mode="Single" header-text="Single Select Mode">
            <ListItemStandard selected={true} icon="map" icon-end={true}>Argentina</ListItemStandard>
            <ListItemStandard icon="map" icon-end={true}>Bulgaria</ListItemStandard>
            <ListItemStandard icon="map" icon-end={true}>China</ListItemStandard>
            <ListItemStandard type="Inactive" icon="map" icon-end={true}>Denmark (ui5-li type='Inactive')</ListItemStandard>
        </List>
        <br />
        <List selection-mode="SingleStart" header-text="Single Select Begin Mode">
            <ListItemStandard selected={true} icon="map" icon-end={true}>Argentina</ListItemStandard>
            <ListItemStandard icon="map" icon-end={true}>Bulgaria</ListItemStandard>
            <ListItemStandard icon="map" icon-end={true}>China</ListItemStandard>
            <ListItemStandard type="Inactive" icon="map" icon-end={true}>Denmark (ui5-li type='Inactive')</ListItemStandard>
        </List>
        <br />
        <List selection-mode="SingleEnd" header-text="Single Select End Mode">
            <ListItemStandard selected={true} icon="map" icon-end={true}>Argentina</ListItemStandard>
            <ListItemStandard icon="map" icon-end={true}>Bulgaria</ListItemStandard>
            <ListItemStandard icon="map" icon-end={true}>China</ListItemStandard>
            <ListItemStandard type="Inactive" icon="map" icon-end={true}>Denmark (ui5-li type='Inactive')</ListItemStandard>
        </List>
        <br />
        <List selection-mode="Multiple" header-text="Multi Select Mode">
            <ListItemStandard>Pineapple</ListItemStandard>
            <ListItemStandard selected={true}>Orange</ListItemStandard>
            <ListItemStandard>Banana</ListItemStandard>
            <ListItemStandard>Mango</ListItemStandard>
        </List>
        <br />
        <List selection-mode="Delete" header-text="Delete Mode">
            <ListItemStandard>Argentina</ListItemStandard>
            <ListItemStandard>Bulgaria</ListItemStandard>
            <ListItemStandard>China</ListItemStandard>
        </List>
    </>
  );
}

export default App;
