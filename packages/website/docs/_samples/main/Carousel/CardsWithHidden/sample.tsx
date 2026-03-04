import { createReactComponent } from "@ui5/webcomponents-base";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import CarouselClass from "@ui5/webcomponents/dist/Carousel.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";

const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Carousel = createReactComponent(CarouselClass);
const Icon = createReactComponent(IconClass);
const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {

  return (
    <>
      <style>{`
        ui5-card {
            width: 300px;
            height: 200px;
            margin: 0.5rem;
        }

        ui5-carousel {
            width: 100%;
            max-width: 800px;
        }
      `}</style>
      <Carousel style={{ width: "100%", maxWidth: "800px" }} items-per-page="S1 M2 L3 XL3" background-design="Solid" page-indicator-background-design="Transparent" page-indicator-border-design="None">

    		<Card style={{ width: "300px", height: "200px", margin: "0.5rem" }} className="myCard">
    			<CardHeader slot="header" status="Item 1" title-text="Visible Card 1" subtitle-text="This card is visible" />
    			<List separators="Inner">
    				<ListItemStandard icon="horizontal-bullet-chart">Marketing Overview</ListItemStandard>
    				<ListItemStandard icon="opportunity">Sales Performance</ListItemStandard>
    				<ListItemStandard icon="line-charts">Quarterly Reports</ListItemStandard>
    			</List>
    		</Card>

    		<Card style={{ width: "300px", height: "200px", margin: "0.5rem" }} className="myCard" hidden={true}>
    			<CardHeader slot="header" status="Item 2" title-text="Hidden Card 2" subtitle-text="This card is hidden via attribute">
    				<Icon name="hide" slot="avatar" />
    			</CardHeader>
    			<List separators="Inner">
    				<ListItemStandard icon="cancel">Hidden Analytics</ListItemStandard>
    				<ListItemStandard icon="delete">Hidden Data Cleanup</ListItemStandard>
    			</List>
    		</Card>

    		<Card style={{ width: "300px", height: "200px", margin: "0.5rem" }} className="myCard">
    			<CardHeader slot="header" status="Item 3" title-text="Visible Card 3" subtitle-text="Visible card after hidden one" />
    			<List separators="Inner">
    				<ListItemStandard icon="horizontal-bullet-chart">Customer Insights</ListItemStandard>
    				<ListItemStandard icon="opportunity">Campaign Performance</ListItemStandard>
    			</List>
    		</Card>

    		<Card style={{ width: "300px", height: "200px", margin: "0.5rem" }} className="myCard">
    			<CardHeader slot="header" status="Item 4" title-text="Visible Card 4" subtitle-text="Visible item example" />
    			<List separators="Inner">
    				<ListItemStandard icon="line-charts">Trend Analysis</ListItemStandard>
    				<ListItemStandard icon="customer">Customer Segments</ListItemStandard>
    				<ListItemStandard icon="workflow-tasks">Action Items</ListItemStandard>
    			</List>
    		</Card>

    		<Card style={{ width: "300px", height: "200px", margin: "0.5rem" }} className="myCard" hidden={true}>
    			<CardHeader slot="header" status="Item 5" title-text="Hidden Card 5" subtitle-text="Another hidden example">
    				<Icon name="hide" slot="avatar" />
    			</CardHeader>
    			<List separators="Inner">
    				<ListItemStandard icon="cancel">Hidden Task</ListItemStandard>
    				<ListItemStandard icon="delete">Hidden Entry</ListItemStandard>
    			</List>
    		</Card>

    		<Card style={{ width: "300px", height: "200px", margin: "0.5rem" }} className="myCard">
    			<CardHeader slot="header" status="Item 6" title-text="Visible Card 6" subtitle-text="End of visible sequence" />
    			<List separators="Inner">
    				<ListItemStandard icon="horizontal-bullet-chart">Final Overview</ListItemStandard>
    				<ListItemStandard icon="opportunity">Closing Metrics</ListItemStandard>
    			</List>
    		</Card>
    	</Carousel>
    </>
  );
}

export default App;
