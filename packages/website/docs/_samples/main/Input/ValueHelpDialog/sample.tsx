import { useState, useRef } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import SuggestionItemClass from "@ui5/webcomponents/dist/SuggestionItem.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/value-help.js";
import "@ui5/webcomponents-icons/dist/search.js";

const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Icon = createReactComponent(IconClass);
const Input = createReactComponent(InputClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const SuggestionItem = createReactComponent(SuggestionItemClass);
const Title = createReactComponent(TitleClass);

export const Example = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [suggestionItems, setSuggestionItems] = useState<string[]>([]);
  const [dialogListItems, setDialogListItems] = useState<{ name: string, productId: string }[]>([]);
  const [dialogSearchValue, setDialogSearchValue] = useState("");
  const valueHelpInputRef = useRef(null);
  const productsRef = useRef(null);

  const loadProducts = async () => {
    if (!productsRef.current) {
      const response = await fetch("../assets/data/products.json");
      productsRef.current = await response.json();
    }
    return productsRef.current;
  };

  const handleValueHelpInput = async () => {
    const products = await loadProducts();
    const query = valueHelpInputRef.current?.value?.toLowerCase() || "";

    if (query) {
      const filtered = products
        .filter((p) => p.name.toLowerCase().indexOf(query) === 0)
        .map((p) => p.name)
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 10);
      setSuggestionItems(filtered);
    } else {
      setSuggestionItems([]);
    }
  };

  const handleValueHelpIconClick = async () => {
    const products = await loadProducts();
    const query = valueHelpInputRef.current?.value?.toLowerCase() || "";
    setDialogSearchValue(query);
    const filtered = products
      .filter((p) => p.name.toLowerCase().indexOf(query) === 0)
      .sort((a, b) => a.name.localeCompare(b.name));
    setDialogListItems(filtered);
    setDialogOpen(true);
  };

  const handleDialogSearchInput = async (
    e: UI5CustomEvent<InputClass, "input">,
  ) => {
    const products = await loadProducts();
    const query = e.currentTarget.value.toLowerCase();
    setDialogSearchValue(query);
    const filtered = products
      .filter((p) => p.name.toLowerCase().indexOf(query) === 0)
      .sort((a, b) => a.name.localeCompare(b.name));
    setDialogListItems(filtered);
  };

  const handleDialogListItemClick = (
    e: UI5CustomEvent<ListClass, "item-click">,
  ) => {
    const item = e.detail.item;
    if (valueHelpInputRef.current) {
      valueHelpInputRef.current!.setAttribute("value", item.innerHTML);
    }
    setDialogOpen(false);
  };

  const handleCancelClick = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Input
        ref={valueHelpInputRef}
        id="valueHelpInput"
        placeholder="Enter product"
        showSuggestions={true}
        onInput={handleValueHelpInput}
      >
        <Icon
          id="valueHelpIcon"
          slot="icon"
          name="value-help"
          onClick={handleValueHelpIconClick}
        />
        {suggestionItems.map((item) => (
          <SuggestionItem key={item} text={item} />
        ))}
      </Input>

      <Dialog id="dialog" open={dialogOpen}>
        <div slot="header" style={{ width: "100%", padding: "1rem" }}>
          <Title level="H4">Products</Title>
          <Input
            style={{ width: "100%", margin: "1rem 0" }}
            id="dialogSearchInput"
            placeholder="Search"
            value={dialogSearchValue}
            onInput={handleDialogSearchInput}
          >
            <Icon id="dialogSearchIcon" slot="icon" name="search" />
          </Input>
        </div>
        <List
          style={{ minWidth: "500px" }}
          id="itemsList"
          no-data-text="No data"
          onItemClick={handleDialogListItemClick}
        >
          {dialogListItems.map((item) => (
            <ListItemStandard key={item.productId} description={item.productId}>
              {item.name}
            </ListItemStandard>
          ))}
        </List>
        <div slot="footer" id="footer">
          <Button
            design="Transparent"
            id="cancelButton"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  );
}
