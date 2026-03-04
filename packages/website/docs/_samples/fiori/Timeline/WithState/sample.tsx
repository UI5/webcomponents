import { createReactComponent } from "@ui5/webcomponents-base";
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

function App() {

  return (
    <>
      <Timeline id="test-timeline">
    		<TimelineGroupItem group-name="Build">
    			<TimelineItem title="Compile" subtitle="Testing suite A" icon="sap-icon://accept" name="Testing suite A" state="Positive">
    				Compilation succeeded.
    			</TimelineItem>
    			<TimelineItem title="Lint" subtitle="Testing suite B" icon="sap-icon://message-information" name="Testing suite B" state="Information">
    				Lint completed with minor issues.
    			</TimelineItem>
    		</TimelineGroupItem>
    		<TimelineGroupItem group-name="Test">
    			<TimelineItem title="Unit Test" subtitle="Testing suite C" icon="sap-icon://decline" name="Testing suite C" state="Negative">
    				Unit tests failed.
    			</TimelineItem>
    			<TimelineItem title="Integration Test" subtitle="Testing suite D" icon="sap-icon://message-warning" name="Testing suite D" state="Critical">
    				Integration tests have warnings.
    			</TimelineItem>
    			<TimelineItem title="E2E Test" subtitle="Testing suite E" icon="sap-icon://accept" name="Testing suite E" state="Positive">
    				End-to-end tests passed.
    			</TimelineItem>
    		</TimelineGroupItem>
    	</Timeline>
    </>
  );
}

export default App;
