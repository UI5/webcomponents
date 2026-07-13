import Timeline from "../../../src/Timeline.js";
import TimelineItem from "../../../src/TimelineItem.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/map.js";

describe("Timeline visual", () => {
	it("basic state — vertical layout", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" name="John Doe" icon="calendar">
					Discussed project milestones and deliverables.
				</TimelineItem>
				<TimelineItem titleText="Phone call" subtitleText="Jan 16, 2024" name="Jane Smith" icon="phone">
					Follow-up call about the design review.
				</TimelineItem>
				<TimelineItem titleText="Site visit" subtitleText="Jan 17, 2024" name="Bob Lee" icon="map">
					On-site inspection of the new office.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("horizontal layout", () => {
		cy.mount(
			<Timeline layout="Horizontal">
				<TimelineItem titleText="Meeting" subtitleText="Jan 15" icon="calendar" />
				<TimelineItem titleText="Phone call" subtitleText="Jan 16" icon="phone" />
				<TimelineItem titleText="Site visit" subtitleText="Jan 17" icon="map" />
			</Timeline>
		);
		cy.screenshot();
	});

	it("item states", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Completed" subtitleText="Jan 15, 2024" state="Positive" icon="calendar" />
				<TimelineItem titleText="Warning" subtitleText="Jan 16, 2024" state="Critical" icon="phone" />
				<TimelineItem titleText="Error" subtitleText="Jan 17, 2024" state="Negative" icon="map" />
				<TimelineItem titleText="Info" subtitleText="Jan 18, 2024" state="Information" icon="calendar" />
			</Timeline>
		);
		cy.screenshot();
	});

	it("item state — Positive", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Task completed" subtitleText="Jan 15, 2024" state="Positive" icon="calendar">
					All requirements met successfully.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("item state — Negative", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Task failed" subtitleText="Jan 15, 2024" state="Negative" icon="calendar">
					Critical error encountered during processing.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("item state — Critical", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Needs attention" subtitleText="Jan 15, 2024" state="Critical" icon="calendar">
					Review required before proceeding.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("item state — Information", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="FYI" subtitleText="Jan 15, 2024" state="Information" icon="calendar">
					Informational update for team awareness.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("items without icons", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Kickoff" subtitleText="Jan 15, 2024" name="Alice" />
				<TimelineItem titleText="Review" subtitleText="Jan 20, 2024" name="Bob" />
				<TimelineItem titleText="Launch" subtitleText="Jan 25, 2024" name="Carol" />
			</Timeline>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Timeline>
					<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" icon="calendar" />
					<TimelineItem titleText="Call" subtitleText="Jan 16, 2024" icon="phone" />
				</Timeline>
			</div>
		);
		cy.screenshot();
	});
});
