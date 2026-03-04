import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemGroupClass from "@ui5/webcomponents/dist/ListItemGroup.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

const Avatar = createReactComponent(AvatarClass);
const List = createReactComponent(ListClass);
const ListItemGroup = createReactComponent(ListItemGroupClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  return (
    <>
      <style>{`
        /* Style the group header title using CSS Shadow Parts */
        #styled-group::part(title) {
        	color: var(--sapButton_Emphasized_TextColor);
        	background-color: var(--sapButton_Emphasized_Background);
        	padding: 0.5rem;
        	border-radius: 0.25rem;
        }

        /* Style the entire header container */
        #styled-group::part(header) {
        	background-color: var(--sapList_HeaderBackground);
        }
      `}</style>
      <List selectionMode="Multiple">
    		<ListItemGroup id="styled-group" headerText="Styled Header">
    			<ListItemStandard iconEnd={true} icon="navigation-right-arrow">Item 1
    				<Avatar slot="image" shape="Square">
    					<img src="/images/avatars/woman_avatar_1.png" alt="Woman image" />
    				</Avatar>
    			</ListItemStandard>
    			<ListItemStandard iconEnd={true} icon="navigation-right-arrow">Item 2
    				<Avatar slot="image" shape="Square">
    					<img src="/images/avatars/woman_avatar_2.png" alt="Woman image" />
    				</Avatar>
    			</ListItemStandard>
    			<ListItemStandard iconEnd={true} icon="navigation-right-arrow">Item 3
    				<Avatar slot="image" shape="Square">
    					<img src="/images/avatars/woman_avatar_3.png" alt="Woman image" />
    				</Avatar>
    			</ListItemStandard>
    		</ListItemGroup>

    		<ListItemGroup headerText="Normal Header">
    			<ListItemStandard iconEnd={true} icon="navigation-right-arrow">Item A
    				<Avatar slot="image" shape="Square">
    					<img src="/images/avatars/man_avatar_1.png" alt="Man image" />
    				</Avatar>
    			</ListItemStandard>
    			<ListItemStandard iconEnd={true} icon="navigation-right-arrow">Item B
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
