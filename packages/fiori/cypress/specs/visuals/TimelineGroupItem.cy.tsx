import Timeline from "../../../src/Timeline.js";
import TimelineItem from "../../../src/TimelineItem.js";
import TimelineGroupItem from "../../../src/TimelineGroupItem.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/map.js";
import "@ui5/webcomponents-icons/dist/accept.js";

describe("TimelineGroupItem visual", () => {
	it("basic state — expanded", () => {
		cy.mount(
			<Timeline>
				<TimelineGroupItem groupName="January 2024">
					<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" name="John Doe" icon="calendar">
						Discussed project milestones.
					</TimelineItem>
					<TimelineItem titleText="Phone call" subtitleText="Jan 16, 2024" name="Jane Smith" icon="phone">
						Follow-up call about the design review.
					</TimelineItem>
				</TimelineGroupItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("collapsed state", () => {
		cy.mount(
			<Timeline>
				<TimelineGroupItem groupName="January 2024" collapsed>
					<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" icon="calendar">
						Discussed project milestones.
					</TimelineItem>
					<TimelineItem titleText="Phone call" subtitleText="Jan 16, 2024" icon="phone">
						Follow-up call about the design review.
					</TimelineItem>
				</TimelineGroupItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("with item states inside group", () => {
		cy.mount(
			<Timeline>
				<TimelineGroupItem groupName="System Events">
					<TimelineItem titleText="Task completed" subtitleText="Jan 15, 2024" state="Positive" icon="accept" />
					<TimelineItem titleText="Needs attention" subtitleText="Jan 16, 2024" state="Critical" icon="calendar" />
					<TimelineItem titleText="Task failed" subtitleText="Jan 17, 2024" state="Negative" icon="map" />
					<TimelineItem titleText="FYI" subtitleText="Jan 18, 2024" state="Information" icon="calendar" />
				</TimelineGroupItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("multiple groups — mixed expanded and collapsed", () => {
		cy.mount(
			<Timeline>
				<TimelineGroupItem groupName="January 2024">
					<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" icon="calendar">
						Discussed project milestones.
					</TimelineItem>
					<TimelineItem titleText="Phone call" subtitleText="Jan 16, 2024" icon="phone" />
				</TimelineGroupItem>
				<TimelineGroupItem groupName="February 2024" collapsed>
					<TimelineItem titleText="Site visit" subtitleText="Feb 3, 2024" icon="map" />
					<TimelineItem titleText="Review" subtitleText="Feb 10, 2024" icon="calendar" />
				</TimelineGroupItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("group mixed with standalone items", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Kickoff" subtitleText="Jan 10, 2024" icon="calendar">
					Project started.
				</TimelineItem>
				<TimelineGroupItem groupName="Sprint 1">
					<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" icon="calendar" />
					<TimelineItem titleText="Review" subtitleText="Jan 20, 2024" icon="phone" />
				</TimelineGroupItem>
				<TimelineItem titleText="Launch" subtitleText="Feb 1, 2024" state="Positive" icon="accept">
					Product launched successfully.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("without group name", () => {
		cy.mount(
			<Timeline>
				<TimelineGroupItem>
					<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" icon="calendar" />
					<TimelineItem titleText="Phone call" subtitleText="Jan 16, 2024" icon="phone" />
				</TimelineGroupItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Timeline>
					<TimelineGroupItem groupName="January 2024">
						<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" icon="calendar" />
						<TimelineItem titleText="Phone call" subtitleText="Jan 16, 2024" icon="phone" />
					</TimelineGroupItem>
				</Timeline>
			</div>
		);
		cy.screenshot();
	});
});
