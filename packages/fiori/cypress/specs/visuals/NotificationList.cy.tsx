import NotificationList from "../../../src/NotificationList.js";
import NotificationListItem from "../../../src/NotificationListItem.js";
import NotificationListGroupItem from "../../../src/NotificationListGroupItem.js";

describe("NotificationList visual", () => {
	it("basic state — single item", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="New order received" showClose>
					Order #12345 has been placed and is awaiting processing.
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
				<NotificationListItem titleText="Upload failed" state="Negative" showClose>
					The file could not be uploaded.
				</NotificationListItem>
				<NotificationListItem titleText="Deployment successful" state="Positive" read showClose>
					Your application is live.
				</NotificationListItem>
				<NotificationListItem titleText="Scheduled maintenance" state="Information" showClose>
					System will be unavailable from 2:00 AM to 4:00 AM.
				</NotificationListItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("with group items", () => {
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
				<NotificationListGroupItem titleText="System">
					<NotificationListItem titleText="Upload failed" state="Negative" showClose>
						The file could not be uploaded.
					</NotificationListItem>
				</NotificationListGroupItem>
			</NotificationList>
		);
		cy.screenshot();
	});

	it("no data text", () => {
		cy.mount(
			<NotificationList noDataText="No notifications" />
		);
		cy.screenshot();
	});

	it("mixed items and groups", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem titleText="Standalone alert" importance="Important" showClose>
					This item is not part of any group.
				</NotificationListItem>
				<NotificationListGroupItem titleText="Updates">
					<NotificationListItem titleText="Deployment successful" state="Positive" showClose>
						Version 2.0 is now live.
					</NotificationListItem>
					<NotificationListItem titleText="Storage almost full" state="Critical" showClose>
						You have used 90% of your storage quota.
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
