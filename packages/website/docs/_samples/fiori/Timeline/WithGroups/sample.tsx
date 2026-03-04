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

            <TimelineGroupItem groupName="Events">
                <TimelineItem id="testItem" class="group-item" titleText="Event" subtitleText="18.06.2024 11:30" name="SAP D-com" />
                <TimelineItem id="testItem" class="group-item" titleText="Event" subtitleText="19.06.2024 12:30" icon="calendar" name="SAP Talk" />
                <TimelineItem id="testItem" class="group-item" titleText="Event" subtitleText="21.06.2024 18:30" name="SAP iXP Summer Party" />
            </TimelineGroupItem>

            <TimelineGroupItem groupName="Meetings">
                <TimelineItem id="testItem" class="group-item" titleText="coming up" subtitleText="10.07.2024 11:30" icon="calendar" name="Team Balkan Meeting" />
                <TimelineItem id="testItem" class="group-item" titleText="coming up" subtitleText="20.08.2024 12:30" icon="calendar" name="Team Balkan Planning" />
                <TimelineItem id="testItem" class="group-item" titleText="coming up" subtitleText="22.08.2024 14:30" icon="calendar" name="Team Balkan Retrospective" />
            </TimelineGroupItem>

            <TimelineGroupItem groupName="Calls">
                <TimelineItem id="testItem" class="group-item" titleText="made group call" subtitleText="20.09.2024 11:30" icon="calendar" name="John Doe" nameClickable={true} />
                <TimelineItem id="testItem" class="group-item" subtitleText="20.09.2024 12:30" name="John Doe" nameClickable={true}>
                    <Avatar initials="JD" />
                    <Label>Has ended the call</Label>
                </TimelineItem>
            </TimelineGroupItem>
        </Timeline>
    </>
  );
}

export default App;
