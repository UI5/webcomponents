import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemGroupClass from "@ui5/webcomponents/dist/ListItemGroup.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";

const Avatar = createReactComponent(AvatarClass);
const List = createReactComponent(ListClass);
const ListItemGroup = createReactComponent(ListItemGroupClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  return (
    <>
      <List selection-mode="Multiple">
    		<ListItemGroup id="styled-group" header-text="Styled Header">
    			<ListItemStandard icon-end={true} icon="navigation-right-arrow">Item 1
    				<Avatar slot="image" shape="Square">
    					<img src="/images/avatars/woman_avatar_1.png" alt="Woman image" />
    				</Avatar>
    			</ListItemStandard>
    			<ListItemStandard icon-end={true} icon="navigation-right-arrow">Item 2
    				<Avatar slot="image" shape="Square">
    					<img src="/images/avatars/woman_avatar_2.png" alt="Woman image" />
    				</Avatar>
    			</ListItemStandard>
    			<ListItemStandard icon-end={true} icon="navigation-right-arrow">Item 3
    				<Avatar slot="image" shape="Square">
    					<img src="/images/avatars/woman_avatar_3.png" alt="Woman image" />
    				</Avatar>
    			</ListItemStandard>
    		</ListItemGroup>

    		<ListItemGroup header-text="Normal Header">
    			<ListItemStandard icon-end={true} icon="navigation-right-arrow">Item A
    				<Avatar slot="image" shape="Square">
    					<img src="/images/avatars/man_avatar_1.png" alt="Man image" />
    				</Avatar>
    			</ListItemStandard>
    			<ListItemStandard icon-end={true} icon="navigation-right-arrow">Item B
    				<Avatar slot="image" shape="Square">
    					<img src="/images/avatars/man_avatar_2.png" alt="Man image" />
    				</Avatar>
    			</ListItemStandard>
    		</ListItemGroup>
    	</List>
    </>
  );
}

export default App;
