import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";

const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Icon = createReactComponent(IconClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  return (
    <>
      <Card style={{ width: "22rem" }}>
            <CardHeader slot="header" title-text="Team Space" subtitle-text="Direct Reports" additional-text="3 of 10">
                <Icon name="group" slot="avatar" />
                <Button design="Transparent" slot="action">View All</Button>
            </CardHeader>
            <List style={{ marginBlockEnd: "0.75rem" }} separators="None">
                <ListItemStandard description="User Researcher">Alain Chevalier
                    <Avatar slot="image" shape="Square">
                        <img src="/images/avatars/man_avatar_1.png" alt="Woman image" />
                    </Avatar>
                </ListItemStandard>
                <ListItemStandard description="Artist">Monique Legrand
                    <Avatar slot="image" shape="Square">
                        <img src="/images/avatars/woman_avatar_1.png" alt="Woman image" />
                    </Avatar>
                </ListItemStandard>
                <ListItemStandard description="UX Specialist">Isabella Adams
                    <Avatar slot="image" shape="Square">
                        <img src="/images/avatars/woman_avatar_2.png" alt="Woman image" />
                    </Avatar>
                </ListItemStandard>
            </List>
        </Card>
    </>
  );
}

export default App;
