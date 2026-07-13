import Avatar from "../../../src/Avatar.js";
import AvatarGroup from "../../../src/AvatarGroup.js";

describe("AvatarGroup visual", () => {
	it("type Group — initials", () => {
		cy.mount(
			<AvatarGroup type="Group">
				<Avatar initials="AB" colorScheme="Accent1" />
				<Avatar initials="CD" colorScheme="Accent2" />
				<Avatar initials="EF" colorScheme="Accent3" />
				<Avatar initials="GH" colorScheme="Accent4" />
			</AvatarGroup>
		);
		cy.screenshot();
	});

	it("type Individual — initials", () => {
		cy.mount(
			<AvatarGroup type="Individual">
				<Avatar initials="AB" colorScheme="Accent1" />
				<Avatar initials="CD" colorScheme="Accent2" />
				<Avatar initials="EF" colorScheme="Accent3" />
				<Avatar initials="GH" colorScheme="Accent4" />
			</AvatarGroup>
		);
		cy.screenshot();
	});

	it("type Group — size XS", () => {
		cy.mount(
			<AvatarGroup type="Group">
				<Avatar size="XS" initials="AB" colorScheme="Accent1" />
				<Avatar size="XS" initials="CD" colorScheme="Accent2" />
				<Avatar size="XS" initials="EF" colorScheme="Accent3" />
				<Avatar size="XS" initials="GH" colorScheme="Accent4" />
			</AvatarGroup>
		);
		cy.screenshot();
	});

	it("type Group — size L", () => {
		cy.mount(
			<AvatarGroup type="Group">
				<Avatar size="L" initials="AB" colorScheme="Accent5" />
				<Avatar size="L" initials="CD" colorScheme="Accent6" />
				<Avatar size="L" initials="EF" colorScheme="Accent7" />
				<Avatar size="L" initials="GH" colorScheme="Accent8" />
			</AvatarGroup>
		);
		cy.screenshot();
	});

	it("overflow — many avatars", () => {
		cy.mount(
			<div style={{ width: "200px" }}>
				<AvatarGroup type="Group">
					<Avatar initials="AA" colorScheme="Accent1" />
					<Avatar initials="BB" colorScheme="Accent2" />
					<Avatar initials="CC" colorScheme="Accent3" />
					<Avatar initials="DD" colorScheme="Accent4" />
					<Avatar initials="EE" colorScheme="Accent5" />
					<Avatar initials="FF" colorScheme="Accent6" />
					<Avatar initials="GG" colorScheme="Accent7" />
					<Avatar initials="HH" colorScheme="Accent8" />
				</AvatarGroup>
			</div>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<AvatarGroup type="Group">
					<Avatar initials="AB" colorScheme="Accent1" />
					<Avatar initials="CD" colorScheme="Accent2" />
					<Avatar initials="EF" colorScheme="Accent3" />
					<Avatar initials="GH" colorScheme="Accent4" />
				</AvatarGroup>
			</div>
		);
		cy.screenshot();
	});
});
