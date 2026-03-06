import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemGroupClass from "@ui5/webcomponents/dist/ListItemGroup.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

const Avatar = createReactComponent(AvatarClass);
const Icon = createReactComponent(IconClass);
const List = createReactComponent(ListClass);
const ListItemGroup = createReactComponent(ListItemGroupClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {
  return (
    <>
      <List selectionMode="Multiple">
        <ListItemGroup headerText="Front End Developers">
          <ListItemStandard icon="navigation-right-arrow" iconEnd={true}>
            Jennifer
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/woman_avatar_3.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
          <ListItemStandard icon="navigation-right-arrow" iconEnd={true}>
            Lora
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/woman_avatar_4.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
          <ListItemStandard icon="navigation-right-arrow" iconEnd={true}>
            Carlotta
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/woman_avatar_5.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
        </ListItemGroup>

        <ListItemGroup headerText="Back End Developers">
          <ListItemStandard icon="navigation-right-arrow" iconEnd={true}>
            Clark
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/man_avatar_1.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
          <ListItemStandard icon="navigation-right-arrow" iconEnd={true}>
            Ellen
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/woman_avatar_1.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
          <ListItemStandard icon="navigation-right-arrow" iconEnd={true}>
            Adam
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/man_avatar_2.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
        </ListItemGroup>

        <ListItemGroup>
          <div
            style={{
              width: "'100%'",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            slot="header"
          >
            <span>Back End Developers</span>
            <Icon name="navigation-right-arrow" />
          </div>
          <ListItemStandard icon="navigation-right-arrow" iconEnd={true}>
            Ellen
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/woman_avatar_1.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
          <ListItemStandard icon="navigation-right-arrow" iconEnd={true}>
            Adam
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/man_avatar_2.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
        </ListItemGroup>
      </List>
    </>
  );
}

export default App;
