import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import SearchClass from "@ui5/webcomponents-fiori/dist/Search.js";
import SearchItemClass from "@ui5/webcomponents-fiori/dist/SearchItem.js";
import SearchItemGroupClass from "@ui5/webcomponents-fiori/dist/SearchItemGroup.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents-icons/dist/customer-and-supplier.js";

const Search = createReactComponent(SearchClass);
const SearchItem = createReactComponent(SearchItemClass);
const SearchItemGroup = createReactComponent(SearchItemGroupClass);
const Avatar = createReactComponent(AvatarClass);

export const Example = () => {
  return (
    <>
      <Search showClearIcon={true} placeholder="Type D to search ...">
        <SearchItemGroup headerText="Suppliers (4)">
          <SearchItem
            text="Danish Fishing Trading Company (100000043)"
            icon="customer-and-supplier"
            description="Byline"
          />
          <SearchItem
            text="Daily Update Ltd. (290210057)"
            icon="customer-and-supplier"
            description="Byline"
          />
          <SearchItem
            text="Damian United (120001884)"
            icon="customer-and-supplier"
            description="Byline"
          />
          <SearchItem
            text="Troda Tech (100230044)"
            icon="customer-and-supplier"
            description="Byline"
          />
        </SearchItemGroup>

        <SearchItemGroup headerText="People (4)">
          <SearchItem text="John Doe" description="Byline">
            <Avatar slot="image" size="XS">
              <img src="/images/avatars/man_avatar_3.png" alt="John Miller" />
            </Avatar>
          </SearchItem>
        </SearchItemGroup>
      </Search>
    </>
  );
}
