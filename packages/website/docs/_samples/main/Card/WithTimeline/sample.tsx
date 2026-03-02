import { createReactComponent } from "@ui5/webcomponents-base";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);

function App() {

  return (
    <>
      <Card style={{ width: "22rem" }}>
            <CardHeader slot="header" title-text="Upcoming Activities" subtitle-text="Today" />
            <Timeline>
                <TimelineItem title-text="called" timestamp={1487583000000} icon="phone" name="John Smith" name-clickable={true} />
                <TimelineItem title-text="Weekly Sync - BTP Design" timestamp={1517349600000} icon="calendar">
                    MR SOF02 2.43
                </TimelineItem>
                <TimelineItem title-text="Video Conference Call - UI5" timestamp={1485813600000} icon="calendar">
                    Online meeting
                </TimelineItem>
            </Timeline>
        </Card>
    </>
  );
}

export default App;
