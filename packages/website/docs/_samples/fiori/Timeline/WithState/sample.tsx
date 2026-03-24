import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TimelineClass from "@ui5/webcomponents-fiori/dist/Timeline.js";
import TimelineGroupItemClass from "@ui5/webcomponents-fiori/dist/TimelineGroupItem.js";
import TimelineItemClass from "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import "@ui5/webcomponents-icons/dist/message-information.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";
import "@ui5/webcomponents-icons/dist/accept.js";

const Timeline = createReactComponent(TimelineClass);
const TimelineGroupItem = createReactComponent(TimelineGroupItemClass);
const TimelineItem = createReactComponent(TimelineItemClass);

export const Example = () => {
  return (
    <>
      <Timeline id="test-timeline">
        <TimelineGroupItem groupName="Build">
          <TimelineItem
            title="Compile"
            subtitleText="Testing suite A"
            icon="accept"
            name="Testing suite A"
            state="Positive"
          >
            Compilation succeeded.
          </TimelineItem>
          <TimelineItem
            title="Lint"
            subtitleText="Testing suite B"
            icon="message-information"
            name="Testing suite B"
            state="Information"
          >
            Lint completed with minor issues.
          </TimelineItem>
        </TimelineGroupItem>
        <TimelineGroupItem groupName="Test">
          <TimelineItem
            title="Unit Test"
            subtitleText="Testing suite C"
            icon="decline"
            name="Testing suite C"
            state="Negative"
          >
            Unit tests failed.
          </TimelineItem>
          <TimelineItem
            title="Integration Test"
            subtitleText="Testing suite D"
            icon="message-warning"
            name="Testing suite D"
            state="Critical"
          >
            Integration tests have warnings.
          </TimelineItem>
          <TimelineItem
            title="E2E Test"
            subtitleText="Testing suite E"
            icon="accept"
            name="Testing suite E"
            state="Positive"
          >
            End-to-end tests passed.
          </TimelineItem>
        </TimelineGroupItem>
      </Timeline>
    </>
  );
}
