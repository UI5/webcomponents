import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/group.js";

const Avatar = createReactComponent(AvatarClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Icon = createReactComponent(IconClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {
  return (
    <>
      <style>{`
        ui5-card {
            width: 22rem;
        }
      `}</style>
      <Card style={{ width: "22rem" }}>
        <CardHeader
          slot="header"
          titleText="This header is interactive"
          subtitleText="Click, press Enter or Space"
          additionalText="3 of 6"
          interactive={true}
        >
          <Icon name="group" slot="avatar" />
        </CardHeader>
        <List style={{ marginBlockEnd: "0.75rem" }} separators="None">
          <ListItemStandard description="Software Architect">
            Richard Wilson
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/man_avatar_2.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
          <ListItemStandard description="Visual Designer">
            Elena Petrova
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/woman_avatar_3.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
          <ListItemStandard description="Quality Specialist">
            John Miller
            <Avatar slot="image" shape="Square">
              <img src="/images/avatars/man_avatar_3.png" alt="Woman image" />
            </Avatar>
          </ListItemStandard>
        </List>
      </Card>
    </>
  );
}

export default App;
