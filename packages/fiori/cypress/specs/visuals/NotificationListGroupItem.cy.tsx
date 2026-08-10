import NotificationList from "../../../src/NotificationList.js";
import NotificationListItem from "../../../src/NotificationListItem.js";
import NotificationListGroupItem from "../../../src/NotificationListGroupItem.js";

describe("NotificationListGroupItem visual", () => {
	it("basic state — expanded", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem titleText="Orders">
					<NotificationListItem titleText="New order received" showClose>
						Order #12345 has been placed.
					</NotificationListItem>
					<NotificationListItem titleText="Order shipped" read showClose>
						Order #12344 is on its way.
					</NotificationListItem>
				</NotificationListGroupItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("collapsed state", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem titleText="Orders" collapsed>
					<NotificationListItem titleText="New order received" showClose>
						Order #12345 has been placed.
					</NotificationListItem>
					<NotificationListItem titleText="Order shipped" read showClose>
						Order #12344 is on its way.
					</NotificationListItem>
				</NotificationListGroupItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("with items of various states", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem titleText="System Notifications">
					<NotificationListItem titleText="Upload failed" state="Negative" showClose>
						The file could not be uploaded.
					</NotificationListItem>
					<NotificationListItem titleText="Storage almost full" state="Critical" showClose>
						You have used 90% of your storage quota.
					</NotificationListItem>
					<NotificationListItem titleText="Deployment successful" state="Positive" showClose>
						Your application is live.
					</NotificationListItem>
					<NotificationListItem titleText="Scheduled maintenance" state="Information" showClose>
						System will be unavailable from 2:00 AM to 4:00 AM.
					</NotificationListItem>
				</NotificationListGroupItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("with important items", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem titleText="High Priority">
					<NotificationListItem titleText="Critical system alert" importance="Important" showClose>
						Immediate action required.
					</NotificationListItem>
					<NotificationListItem titleText="New order received" importance="Important" showClose>
						Order #12345 needs approval.
					</NotificationListItem>
				</NotificationListGroupItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("growing — Button mode", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem titleText="Updates" growing="Button">
					<NotificationListItem titleText="Deployment successful" state="Positive" showClose>
						Version 2.0 is now live.
					</NotificationListItem>
					<NotificationListItem titleText="New order received" showClose>
						Order #12346 has been placed.
					</NotificationListItem>
				</NotificationListGroupItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("multiple groups", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem titleText="Orders">
					<NotificationListItem titleText="New order received" importance="Important" showClose>
						Order #12345 has been placed.
					</NotificationListItem>
					<NotificationListItem titleText="Order shipped" read showClose>
						Order #12344 is on its way.
					</NotificationListItem>
				</NotificationListGroupItem>
				<NotificationListGroupItem titleText="System" collapsed>
					<NotificationListItem titleText="Upload failed" state="Negative" showClose>
						The file could not be uploaded.
					</NotificationListItem>
				</NotificationListGroupItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<NotificationList>
					<NotificationListGroupItem titleText="Alerts">
						<NotificationListItem titleText="Upload failed" state="Negative" showClose>
							The file could not be uploaded.
						</NotificationListItem>
						<NotificationListItem titleText="Deployment successful" state="Positive" read showClose>
							Your application is live.
						</NotificationListItem>
					</NotificationListGroupItem>
				</NotificationList>
			</div>
		);
		cy.screenshot();
	});
});
