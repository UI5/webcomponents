import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemCustomClass from "@ui5/webcomponents/dist/ListItemCustom.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/delete.js";

const List = createReactComponent(ListClass);
const ListItemCustom = createReactComponent(ListItemCustomClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const Button = createReactComponent(ButtonClass);
const Title = createReactComponent(TitleClass);
const Label = createReactComponent(LabelClass);

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "100%",
  padding: "0.5rem 0",
};

const textStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
};

function App() {
  return (
    <>
      <List headerText="Products (focus a row, then press F2 or F7)">
        <ListItemCustom accessibleName="Ergonomic keyboard">
          <div style={rowStyle}>
            <div style={textStyle}>
              <Title size="H6">Ergonomic Keyboard</Title>
              <Label>In stock</Label>
            </div>
            <Button icon="edit" design="Transparent" accessibleName="Edit ergonomic keyboard" tooltip="Edit" />
            <Button icon="delete" design="Transparent" accessibleName="Delete ergonomic keyboard" tooltip="Delete" />
          </div>
        </ListItemCustom>
        <ListItemCustom accessibleName="Wireless mouse">
          <div style={rowStyle}>
            <div style={textStyle}>
              <Title size="H6">Wireless Mouse</Title>
              <Label>In stock</Label>
            </div>
            <Button icon="edit" design="Transparent" accessibleName="Edit wireless mouse" tooltip="Edit" />
            <Button icon="delete" design="Transparent" accessibleName="Delete wireless mouse" tooltip="Delete" />
          </div>
        </ListItemCustom>
        <ListItemCustom accessibleName="27-inch monitor">
          <div style={rowStyle}>
            <div style={textStyle}>
              <Title size="H6">27-inch Monitor</Title>
              <Label>Low stock</Label>
            </div>
            <Button icon="edit" design="Transparent" accessibleName="Edit 27-inch monitor" tooltip="Edit" />
            <Button icon="delete" design="Transparent" accessibleName="Delete 27-inch monitor" tooltip="Delete" />
          </div>
        </ListItemCustom>
      </List>

      <br />

      <List
        headerText="Delete mode - per-item delete button is Tab-reachable in edit mode"
        selectionMode="Delete"
      >
        <ListItemStandard>Draft: Q3 report</ListItemStandard>
        <ListItemStandard>Draft: Onboarding checklist</ListItemStandard>
        <ListItemStandard>Draft: Release notes</ListItemStandard>
      </List>
    </>
  );
}

export default App;
