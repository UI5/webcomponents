import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemCustomClass from "@ui5/webcomponents/dist/ListItemCustom.js";
import ListItemGroupClass from "@ui5/webcomponents/dist/ListItemGroup.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Avatar = createReactComponent(AvatarClass);
const Label = createReactComponent(LabelClass);
const List = createReactComponent(ListClass);
const ListItemCustom = createReactComponent(ListItemCustomClass);
const ListItemGroup = createReactComponent(ListItemGroupClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);
const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <style>{`
        .custom-list-item {
        	display: flex;
        	align-items: flex-start;
        	gap: 1rem;
        	padding: 0.5rem;
        }

        .custom-list-item__avatar {
        	flex-shrink: 0;
        }

        .custom-list-item__content {
        	flex: 1;
        	display: flex;
        	flex-direction: column;
        	gap: 0.25rem;
        }

        .custom-list-item__title {
        	margin: 0;
        }

        .custom-list-item__description {
        	color: var(--sapNeutralTextColor);
        }

        .custom-list-item__additional {
        	font-size: 0.875rem;
        	color: var(--sapNeutralTextColor);
        }
      `}</style>
      <List header-text="List Item Wrapping Examples">
    		{/* Default Behavior (Truncating) */}
    		<ListItemStandard text="Long list item title that gets truncated when it exceeds the width of the container. This allows users to see the beginning of the text and understand what the item is about. Long list item title that gets truncated when it exceeds the width of the container. This allows users to see the beginning of the text and understand what the item is about." description="This description is truncated by default and shows an ellipsis at the end when the text is too long to fit in a single line. This description is truncated by default and shows an ellipsis at the end when the text is too long to fit in a single line." additional-text="Truncated">
    			<Avatar slot="image">
    				<img src="/images/avatars/man_avatar_1.png" alt="Man image" />
    			</Avatar>
    		</ListItemStandard>

    		{/* Wrapped Behavior */}
    		<ListItemStandard wrapping-type="Normal" text="Long list item title that gets wrapped when it exceeds the width of the container. This allows users to read the full title without requiring interaction. Long list item title that gets wrapped when it exceeds the width of the container. This allows users to read the full title without requiring interaction. Long list item title that gets wrapped when it exceeds the width of the container. This allows users to read the full title without requiring interaction." description="This description gets wrapped when the 'wrappingType' property is set to 'Normal', and the content flows to multiple lines instead of being truncated. This allows users to read lengthy descriptions without requiring interaction. This description gets wrapped when the 'wrappingType' property is set to 'Normal', and the content flows to multiple lines instead of being truncated. This allows users to read lengthy descriptions without requiring interaction." additional-text="Wrapped">
    			<Avatar slot="image">
    				<img src="/images/avatars/man_avatar_2.png" alt="Man image" />
    			</Avatar>
    		</ListItemStandard>
    	</List>
	
    	<br />
    	<br />

    	<List header-text="Custom List Item with Wrapping">
    		{/* Custom Behavior with ExpandableText */}
    		<ListItemCustom>
    			<div className="custom-list-item">
    				<Avatar className="custom-list-item__avatar">
    					<img src="/images/avatars/woman_avatar_1.png" alt="Woman image" />
    				</Avatar>
    				<div className="custom-list-item__content">
    					<Title size="H6" className="custom-list-item__title">Product with Expandable Description</Title>
    					<ui5-expandable-text 
    						className="custom-list-item__description"
    						max-characters="120"
    						text="This custom list item uses ExpandableText to provide controlled expansion of lengthy content. Users can choose to read more when they need detailed information, keeping the list compact by default. This approach gives developers full control over the content layout and interaction while maintaining accessibility and user experience standards.">
    					</ui5-expandable-text>
    					<Label className="custom-list-item__additional">Expandable</Label>
    				</div>
    			</div>
    		</ListItemCustom>
    		<ListItemCustom>
    			<div className="custom-list-item">
    				<Avatar className="custom-list-item__avatar">
    					<img src="/images/avatars/woman_avatar_2.png" alt="Woman image" />
    				</Avatar>
    				<div className="custom-list-item__content">
    					<Title size="H6" className="custom-list-item__title">Product with Expandable Description</Title>
    					<ui5-expandable-text 
    						className="custom-list-item__description"
    						max-characters="120"
    						text="This custom list item uses ExpandableText to provide controlled expansion of lengthy content. Users can choose to read more when they need detailed information, keeping the list compact by default. This approach gives developers full control over the content layout and interaction while maintaining accessibility and user experience standards.">
    					</ui5-expandable-text>
    					<Label className="custom-list-item__additional">Expandable</Label>
    				</div>
    			</div>
    		</ListItemCustom>
    	</List>

    		<br />
    		<br />

    		<List header-text="List Item Group with Wrapping">
    			<ListItemGroup wrapping-type="Normal" header-text="Long List Item Group header text that gets wrapped when it exceeds the width of the container. This allows users to read the full title without requiring interaction. Long list item title that gets wrapped when it exceeds the width of the container. This allows users to read the full title without requiring interaction. Long list item title that gets wrapped when it exceeds the width of the container. This allows users to read the full title without requiring interaction.">
    				<ListItemStandard text="regular list item">
    					<Avatar slot="image">
    						<img src="/images/avatars/man_avatar_2.png" alt="Man image" />
    					</Avatar>
    				</ListItemStandard>
    			</ListItemGroup>
    		</List>
    </>
  );
}

export default App;
