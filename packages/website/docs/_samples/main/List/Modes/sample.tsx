import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/map.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

export const Example = () => {
  return (
    <>
      <List selectionMode="Single" headerText="Single Select Mode">
        <ListItemStandard selected={true} icon="map" iconEnd={true}>
          Argentina
        </ListItemStandard>
        <ListItemStandard icon="map" iconEnd={true}>
          Bulgaria
        </ListItemStandard>
        <ListItemStandard icon="map" iconEnd={true}>
          China
        </ListItemStandard>
        <ListItemStandard type="Inactive" icon="map" iconEnd={true}>
          Denmark (ui5-li type='Inactive')
        </ListItemStandard>
      </List>
      <br />
      <List selectionMode="SingleStart" headerText="Single Select Begin Mode">
        <ListItemStandard selected={true} icon="map" iconEnd={true}>
          Argentina
        </ListItemStandard>
        <ListItemStandard icon="map" iconEnd={true}>
          Bulgaria
        </ListItemStandard>
        <ListItemStandard icon="map" iconEnd={true}>
          China
        </ListItemStandard>
        <ListItemStandard type="Inactive" icon="map" iconEnd={true}>
          Denmark (ui5-li type='Inactive')
        </ListItemStandard>
      </List>
      <br />
      <List selectionMode="SingleEnd" headerText="Single Select End Mode">
        <ListItemStandard selected={true} icon="map" iconEnd={true}>
          Argentina
        </ListItemStandard>
        <ListItemStandard icon="map" iconEnd={true}>
          Bulgaria
        </ListItemStandard>
        <ListItemStandard icon="map" iconEnd={true}>
          China
        </ListItemStandard>
        <ListItemStandard type="Inactive" icon="map" iconEnd={true}>
          Denmark (ui5-li type='Inactive')
        </ListItemStandard>
      </List>
      <br />
      <List selectionMode="Multiple" headerText="Multi Select Mode">
        <ListItemStandard>Pineapple</ListItemStandard>
        <ListItemStandard selected={true}>Orange</ListItemStandard>
        <ListItemStandard>Banana</ListItemStandard>
        <ListItemStandard>Mango</ListItemStandard>
      </List>
      <br />
      <List selectionMode="Delete" headerText="Delete Mode">
        <ListItemStandard>Argentina</ListItemStandard>
        <ListItemStandard>Bulgaria</ListItemStandard>
        <ListItemStandard>China</ListItemStandard>
      </List>
    </>
  );
}
