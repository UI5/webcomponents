import Timeline from "../../../src/Timeline.js";
import TimelineItem from "../../../src/TimelineItem.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/map.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/message-information.js";

describe("TimelineItem visual", () => {
	it("basic state", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" name="John Doe" icon="calendar">
					Discussed project milestones and deliverables.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("without icon", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Kickoff" subtitleText="Jan 15, 2024" name="Alice" />
			</Timeline>
		);
		cy.screenshot();
	});

	it("without content", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Phone call" subtitleText="Jan 16, 2024" name="Jane Smith" icon="phone" />
			</Timeline>
		);
		cy.screenshot();
	});

	it("clickable name", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" name="John Doe" nameClickable icon="calendar">
					Click the name to navigate to the user profile.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("state — Positive", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Task completed" subtitleText="Jan 15, 2024" state="Positive" icon="accept">
					All requirements met successfully.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("state — Negative", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Task failed" subtitleText="Jan 15, 2024" state="Negative" icon="calendar">
					Critical error encountered during processing.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("state — Critical", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Needs attention" subtitleText="Jan 15, 2024" state="Critical" icon="calendar">
					Review required before proceeding.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("state — Information", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="FYI" subtitleText="Jan 15, 2024" state="Information" icon="message-information">
					Informational update for team awareness.
				</TimelineItem>
			</Timeline>
		);
		cy.screenshot();
	});

	it("multiple items", () => {
		cy.mount(
			<Timeline>
				<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" name="John Doe" icon="calendar">
					Discussed project milestones.
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

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Timeline>
					<TimelineItem titleText="Meeting" subtitleText="Jan 15, 2024" name="John Doe" icon="calendar">
						Discussed project milestones.
					</TimelineItem>
					<TimelineItem titleText="Phone call" subtitleText="Jan 16, 2024" name="Jane Smith" icon="phone" />
				</Timeline>
			</div>
		);
		cy.screenshot();
	});
});
