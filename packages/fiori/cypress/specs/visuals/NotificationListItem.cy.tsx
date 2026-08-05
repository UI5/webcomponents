import NotificationList from "../../../src/NotificationList.js";
import NotificationListItem from "../../../src/NotificationListItem.js";

describe("NotificationListItem visual", () => {
	it("basic state — unread", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="New order received" showClose>
					Order #12345 has been placed and is awaiting processing.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("read state", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="New order received" read showClose>
					Order #12345 has been placed and is awaiting processing.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("importance — Important", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="Critical system alert" importance="Important" showClose>
					System maintenance scheduled for tonight at 10 PM.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("state — Negative", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="Upload failed" state="Negative" showClose>
					The file could not be uploaded. Please try again.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("state — Critical", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="Storage almost full" state="Critical" showClose>
					You have used 90% of your storage quota.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("state — Positive", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="Deployment successful" state="Positive" showClose>
					Your application has been deployed successfully.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("state — Information", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="Scheduled maintenance" state="Information" showClose>
					System will be unavailable from 2:00 AM to 4:00 AM.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("wrapping — long text", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem
					titleText="Very long notification title that should wrap onto the next line when wrapping is enabled"
					wrappingType="Normal"
					showClose
				>
					This is a longer description that goes into more detail about the notification and what action needs to be taken by the user to resolve the issue.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("without close button", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="Non-dismissable notification">
					This notification cannot be closed by the user.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("multiple items", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="New order received" importance="Important" showClose>
					Order #12345 has been placed.
				</NotificationListItem>
				<NotificationListItem titleText="Upload failed" state="Negative" read showClose>
					The file could not be uploaded.
				</NotificationListItem>
				<NotificationListItem titleText="Deployment successful" state="Positive" showClose>
					Your application is live.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<NotificationList>
					<NotificationListItem titleText="Compact notification" importance="Important" showClose>
						Compact mode notification item.
					</NotificationListItem>
				</NotificationList>
			</div>
		);
		cy.screenshot();
	});
});
