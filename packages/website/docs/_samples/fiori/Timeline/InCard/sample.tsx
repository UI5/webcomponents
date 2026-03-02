import { createReactComponent } from "@ui5/webcomponents-base";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Label = createReactComponent(LabelClass);

function App() {

  return (
    <>
      <Card>
            <CardHeader slot="header" title-text="Upcoming Activities" subtitle-text="For Today" />

            <div style={{ padding: "2rem" }}>
                <Timeline layout="Horizontal">
                    <TimelineItem id="test-item" title-text="called" subtitle-text="20.02.2017 11:30" icon="phone" name="Stanislava Baltova" name-clickable={true} />
                    <TimelineItem title-text="Weekly Sync - CP Design" subtitle-text="27.08.2017 (11:00 - 12:00)" icon="calendar">
                        <Label>MR SOF02 2.43</Label>
                    </TimelineItem>
                    <TimelineItem title-text="Video Conference Call - UI5" subtitle-text="31.01.2018 (12:00 - 13:00)" icon="calendar" name="Stanislava Baltova">
                        Online meeting
                    </TimelineItem>
                </Timeline>
            </div>
        </Card>
    </>
  );
}

export default App;
