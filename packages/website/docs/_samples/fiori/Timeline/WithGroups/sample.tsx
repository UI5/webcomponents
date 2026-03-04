import { createReactComponent } from "@ui5/webcomponents-base";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineGroupItemClass from "@ui5/webcomponents-fiori/dist/TimelineGroupItem.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/calendar.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineGroupItem = createReactComponent(TimelineGroupItemClass);
const TimelineItem = createReactComponent(TimelineItemClass);
const Avatar = createReactComponent(AvatarClass);
const Label = createReactComponent(LabelClass);

function App() {

  return (
    <>
      <Timeline layout="Vertical" id="testTimeline">

            <TimelineGroupItem group-name="Events">
                <TimelineItem id="testItem" className="group-item" title-text="Event" subtitle-text="18.06.2024 11:30" name="SAP D-com" />
                <TimelineItem id="testItem" className="group-item" title-text="Event" subtitle-text="19.06.2024 12:30" icon="calendar" name="SAP Talk" />
                <TimelineItem id="testItem" className="group-item" title-text="Event" subtitle-text="21.06.2024 18:30" name="SAP iXP Summer Party" />
            </TimelineGroupItem>

            <TimelineGroupItem group-name="Meetings">
                <TimelineItem id="testItem" className="group-item" title-text="coming up" subtitle-text="10.07.2024 11:30" icon="calendar" name="Team Balkan Meeting" />
                <TimelineItem id="testItem" className="group-item" title-text="coming up" subtitle-text="20.08.2024 12:30" icon="calendar" name="Team Balkan Planning" />
                <TimelineItem id="testItem" className="group-item" title-text="coming up" subtitle-text="22.08.2024 14:30" icon="calendar" name="Team Balkan Retrospective" />
            </TimelineGroupItem>

            <TimelineGroupItem group-name="Calls">
                <TimelineItem id="testItem" className="group-item" title-text="made group call" subtitle-text="20.09.2024 11:30" icon="calendar" name="John Doe" name-clickable={true} />
                <TimelineItem id="testItem" className="group-item" subtitle-text="20.09.2024 12:30" name="John Doe" name-clickable={true}>
                    <Avatar initials="JD" />
                    <Label>Has ended the call</Label>
                </TimelineItem>
            </TimelineGroupItem>
        </Timeline>
    </>
  );
}

export default App;
