import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/calendar.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);

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
          titleText="Upcoming Activities"
          subtitleText="Today"
        />
        <Timeline>
          <TimelineItem
            titleText="called"
            icon="phone"
            name="John Smith"
            nameClickable={true}
          />
          <TimelineItem
            titleText="Weekly Sync - BTP Design"
            icon="calendar"
          >
            MR SOF02 2.43
          </TimelineItem>
          <TimelineItem
            titleText="Video Conference Call - UI5"
            icon="calendar"
          >
            Online meeting
          </TimelineItem>
        </Timeline>
      </Card>
    </>
  );
}

export default App;
