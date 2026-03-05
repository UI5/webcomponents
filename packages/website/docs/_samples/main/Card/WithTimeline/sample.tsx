import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/calendar.js";

const Timeline = createComponent(TimelineClass);
const TimelineItem = createComponent(TimelineItemClass);
const Card = createComponent(CardClass);
const CardHeader = createComponent(CardHeaderClass);

function App() {

  return (
    <>
      <style>{`
        ui5-card {
            width: 22rem;
        }
      `}</style>
      <Card style={{ width: "22rem" }}>
            <CardHeader slot="header" titleText="Upcoming Activities" subtitleText="Today" />
            <Timeline>
                <TimelineItem titleText="called" timestamp={1487583000000} icon="phone" name="John Smith" nameClickable={true} />
                <TimelineItem titleText="Weekly Sync - BTP Design" timestamp={1517349600000} icon="calendar">
                    MR SOF02 2.43
                </TimelineItem>
                <TimelineItem titleText="Video Conference Call - UI5" timestamp={1485813600000} icon="calendar">
                    Online meeting
                </TimelineItem>
            </Timeline>
        </Card>
    </>
  );
}

export default App;
