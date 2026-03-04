import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";

const Tab = createComponent(TabClass);
const TabContainer = createComponent(TabContainerClass);

function App() {

  return (
    <>
      <TabContainer>
    	<Tab text="Notes">
    		Notes go here ...
    	</Tab>
    	<Tab text="Products">
    		Products go here ...
    		<Tab slot="items" text="Computers">
    			Computers go here ...
    			<Tab slot="items" text="Laptops" selected={true}>
    				Laptops go here ...
    			</Tab>
    			<Tab slot="items" text="Desktops">
    				<Tab slot="items" text="Work Stations">
    					Work Stations go here ...
    				</Tab>
    				<Tab slot="items" text="Game Stations">
    					Game Stations go here ...
    				</Tab>
    				Desktops go here ...
    			</Tab>
    		</Tab>
    		<Tab text="Phones" slot="items">
    			<Tab text="Smartphones" slot="items">
    				Smartphones go here ...
    			</Tab>
    			<Tab text="Tablets" slot="items">
    				Tablets go here ...
    			</Tab>
    			Phones go here ...
    		</Tab>
    	</Tab>
    	<Tab text="Orders">
    		Orders go here ...
    		<Tab slot="items" text="Attachments">
    			Order attachments go here ...
    		</Tab>
    	</Tab>
    </TabContainer>
    </>
  );
}

export default App;
