import Avatar from "../../src/Avatar.js";
import AvatarGroup from "../../src/AvatarGroup.js";
import type UI5Element from "@ui5/webcomponents-base";

describe("Overflow", () => {
	it("checks if overflow button is hiding properly", () => {
		cy.mount(<AvatarGroup id="ag" style="width: 100px;">
			<Avatar initials="II"></Avatar>
			<Avatar initials="II"></Avatar>
			<Avatar initials="II"></Avatar>
		</AvatarGroup>);

		// Store the expected hidden items to compare against
		const expectedHiddenItems = 0;

		// Check if the aria-label is correctly set
		cy.get("#ag")
			.as("ag")
			.then($el => {
				$el.get(0).innerHTML = "";
				return $el;
			});

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@ag")
			.then($el => {
				const avatar = document.createElement("ui5-avatar");
				avatar.setAttribute("initials", "II");
				$el.get(0).appendChild(avatar);
				const ag = document.querySelector("#ag") as AvatarGroup;
				return ag._hiddenItems;
			})
			.should("equal", expectedHiddenItems);
	});
});

describe("Avatars", () => {
	it("checks if no unnecessary margin is applied of only one Avatar is available", () => {
		cy.mount(<AvatarGroup id="ag2" type="Group">
			<Avatar id="av1" initials="II"></Avatar>
			<Avatar id="av2" initials="II"></Avatar>
		</AvatarGroup>);

		cy.get("#av2").invoke("remove");

		cy.get("#av1")
			.invoke("attr", "style")
			.should("equal", "");
	});


	it("tests if _color-scheme attribute is automatically set to avatars", () => {
		const avatarCount = 20;
		cy.mount(<AvatarGroup id="ag" type="Group">
			{Array.from({ length: avatarCount }, (_, i) => {
				return <Avatar initials="II"></Avatar>;
			})}
		</AvatarGroup>);

		Array.from({ length: avatarCount }, (_, i) => {
			const index = (i % 10) + 1;
			cy.get("ui5-avatar").eq(i).should("have.attr", "_color-scheme", `Accent${index}`);
		});
	});
});

describe("Accessibility", () => {
	it("checks if accessibleName is properly set and applied as aria-label", () => {
		const customLabel = "Development Team Members";

		cy.mount(<AvatarGroup id="ag" accessible-name={customLabel}>
			<Avatar initials="JD"></Avatar>
			<Avatar initials="SM"></Avatar>
			<Avatar initials="KL"></Avatar>
		</AvatarGroup>);

		cy.get("#ag")
			.should("have.attr", "accessible-name", customLabel)
			.then(($el) => {
				const avatarGroup = $el.get(0) as AvatarGroup;
				expect(avatarGroup.accessibleName).to.equal(customLabel);
			});

		cy.get("#ag")
			.shadow()
			.find(".ui5-avatar-group-items")
			.should("have.attr", "aria-label", customLabel)
			.and("not.have.attr", "aria-labelledby");
	});

	it("checks if accessibleNameRef is properly set and applied as aria-label", () => {
		const labelId = "team-header";

		cy.mount(
			<>
				<h3 id={labelId}>Quality Assurance Team</h3>
				<AvatarGroup id="ag" accessible-name-ref={labelId}>
					<Avatar initials="AB"></Avatar>
					<Avatar initials="CD"></Avatar>
					<Avatar initials="EF"></Avatar>
				</AvatarGroup>
			</>
		);

		cy.get("#ag")
			.should("have.attr", "accessible-name-ref", labelId)
			.then(($el) => {
				const avatarGroup = $el.get(0) as AvatarGroup;
				expect(avatarGroup.accessibleNameRef).to.equal(labelId);
			});

		cy.get("#ag")
			.shadow()
			.find(".ui5-avatar-group-items")
			.should("have.attr", "aria-label", "Quality Assurance Team");

		cy.get("#ag")
			.shadow()
			.find(".ui5-avatar-group-items")
			.should("not.have.attr", "aria-labelledby");

		cy.get(`#${labelId}`).should("exist");
	});

	describe("AvatarGroup - getFocusDomRef Method", () => {
	it("should return undefined when the AvatarGroup is empty", () => {
		cy.mount(<AvatarGroup></AvatarGroup>);

		cy.get<AvatarGroup>("[ui5-avatar-group]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first avatar if no item was focused before", () => {
		cy.mount(
			<AvatarGroup type="Individual">
				<Avatar id="av1" initials="II"></Avatar>
				<Avatar initials="II"></Avatar>
			</AvatarGroup>
		);

		cy.get<UI5Element>("[ui5-avatar-group], #av1")
			.then(($el) => {
				const avGroup = $el[0];
				const avatar = $el[1];

				expect(avGroup.getFocusDomRef()).to.equal(avatar.getFocusDomRef());
			});
	});

	it("should return last focused avatar in the AvatarGroup", () => {
		cy.mount(
			<AvatarGroup type="Individual">
				<Avatar initials="II"></Avatar>
				<Avatar id="av2" initials="II"></Avatar>
			</AvatarGroup>
		);

		cy.get("#av2").click();
		cy.get("#av2").should("be.focused");

		cy.get<UI5Element>("[ui5-avatar-group], #av2")
			.then(($el) => {
				const avGroup = $el[0];
				const avatar = $el[1];

				expect(avGroup.getFocusDomRef()).to.equal(avatar.getFocusDomRef());
			});
	});
});
});

describe("AvatarGroup Rendering and Events", () => {
	it("tests if web component is correctly rendered", () => {
		cy.mount(
			<div style={{width: "400px"}}>
				<AvatarGroup type="Individual">
					<Avatar size="XL" interactive icon="home" initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
				</AvatarGroup>
				<AvatarGroup type="Group">
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" icon="home"></Avatar>
				</AvatarGroup>
			</div>
		);

		cy.get("[ui5-avatar-group]").eq(0)
			.shadow()
			.find("div")
			.should("exist");

		cy.get("[ui5-avatar-group]").eq(1)
			.shadow()
			.find("div")
			.should("exist");
	});

	it("tests click event when avatar is clicked", () => {
		cy.mount(
			<div style={{width: "400px"}}>
				<AvatarGroup type="Individual">
					<Avatar size="XL" interactive icon="home" initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
				</AvatarGroup>
			</div>
		);

		cy.get("[ui5-avatar-group]")
			.as("avatarGroup")
			.then(($avatarGroup) => {
				$avatarGroup[0].addEventListener("ui5-click", cy.stub().as("clickStub"));
			});

		cy.get("[ui5-avatar]").first().realClick();

		cy.get("@clickStub")
			.should("have.been.calledOnce")
			.its("firstCall.args.0.detail")
			.should("deep.include", {
				overflowButtonClicked: false
			})
			.its("targetRef.tagName")
			.should("equal", "UI5-AVATAR");
	});

	it("tests click event when overflow button is clicked", () => {
		cy.mount(
			<div style={{width: "200px"}}>
				<AvatarGroup type="Individual">
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
				</AvatarGroup>
			</div>
		);

		cy.get("[ui5-avatar-group]")
			.as("avatarGroup")
			.then(($avatarGroup) => {
				$avatarGroup[0].addEventListener("ui5-click", cy.stub().as("clickStub"));
			});
		
		cy.get("@avatarGroup")
			.shadow()
			.find("ui5-button")
			.realClick();

		cy.get("@clickStub")
			.should("have.been.calledOnce")
			.its("firstCall.args.0.detail")
			.should("deep.include", {
				overflowButtonClicked: true
			})
			.its("targetRef.tagName")
			.should("equal", "UI5-BUTTON");
	});

	it("tests click event avatar group with type group is clicked", () => {
		cy.mount(
			<AvatarGroup type="Group">
				<Avatar size="M" initials="M"></Avatar>
				<Avatar size="M" initials="M"></Avatar>
				<Avatar size="M" icon="home"></Avatar>
			</AvatarGroup>
		);

		cy.get("[ui5-avatar-group]")
			.as("avatarGroup")
			.then(($avatarGroup) => {
				$avatarGroup[0].addEventListener("ui5-click", cy.stub().as("clickStub"));
			});
		
		cy.get("@avatarGroup")
			.shadow()
			.find(".ui5-avatar-group-items")
			.realClick();

		cy.get("@clickStub")
			.should("have.been.calledOnce")
			.its("firstCall.args.0.detail")
			.should("deep.include", {
				overflowButtonClicked: false
			})
			.its("targetRef")
			.then((targetRef) => {
				expect(targetRef.tagName + "." + targetRef.className).to.equal("DIV.ui5-avatar-group-items");
			});
	});

	it("tests if hiddenItems is correctly displayed in the overflow button", () => {
		cy.viewport(200, 1080);

		cy.mount(
			<div style={{width: "400px"}}>
				<AvatarGroup type="Individual">
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
				</AvatarGroup>
			</div>
		);
	
		cy.get("[ui5-avatar-group]")
			.shadow()
			.find("ui5-button")
			.should("not.have.text", "")
			.invoke("text")
			.then((buttonText) => {
				cy.get("[ui5-avatar-group]")
					.then(($avatarGroup) => {
						const avatarGroup = $avatarGroup[0] as AvatarGroup;
						const hiddenItemsCount = avatarGroup.hiddenItems.length;
						expect(buttonText).to.equal(`+${hiddenItemsCount}`);
					});
			});
	});

	it("tests if click event is firing only once", () => {
		cy.mount(
			<div style={{width: "400px"}}>
				<AvatarGroup type="Individual">
					<Avatar size="XL" interactive icon="home" initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive icon="home"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
				</AvatarGroup>
				<AvatarGroup type="Group">
					<Avatar size="XL" interactive icon="home" initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive icon="home"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
				</AvatarGroup>
			</div>
		);

		cy.get("[ui5-avatar-group]").eq(0)
			.as("individualGroup")
			.then(($avatarGroup) => {
				$avatarGroup[0].addEventListener("ui5-click", cy.stub().as("individualClickStub"));
			});

		cy.get("[ui5-avatar-group]").eq(1)
			.as("groupType")
			.then(($avatarGroup) => {
				$avatarGroup[0].addEventListener("ui5-click", cy.stub().as("groupClickStub"));
			});

		// Test individual avatar clicks
		cy.get("[ui5-avatar]").first().realClick();
		cy.get("@individualClickStub").should("have.been.calledOnce");

		cy.get("[ui5-avatar]").first().realPress("Enter");
		cy.get("@individualClickStub").should("have.been.calledTwice");

		cy.get("[ui5-avatar]").first().realPress("Space");
		cy.get("@individualClickStub").should("have.been.calledThrice");

		// Test overflow button clicks
		cy.get("@individualGroup")
			.shadow()
			.find("ui5-button")
			.realClick();
		cy.get("@individualClickStub").should("have.callCount", 4);

		cy.get("@individualGroup")
			.shadow()
			.find("ui5-button")
			.realPress("Enter");
		cy.get("@individualClickStub").should("have.callCount", 5);

		cy.get("@individualGroup")
			.shadow()
			.find("ui5-button")
			.realPress("Space");
		cy.get("@individualClickStub").should("have.callCount", 6);

		// Test group avatar clicks
		cy.get("@groupType").realClick();
		cy.get("@groupClickStub").should("have.been.calledOnce");

		cy.get("@groupType").realPress("Enter");
		cy.get("@groupClickStub").should("have.been.calledTwice");

		cy.get("@groupType").realPress("Space");
		cy.get("@groupClickStub").should("have.been.calledThrice");
	});
});

describe("AvatarGroup ARIA Attributes", () => {
	describe("Type Individual", () => {
		it("role is correct", () => {
			cy.mount(
				<div style={{width: "200px"}}>
					<AvatarGroup type="Individual">
						<Avatar size="XL" interactive icon="home" initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
					</AvatarGroup>
				</div>
			);

			cy.get("[ui5-avatar-group]")
				.should("have.prop", "_role", "group");
		});

		it("aria-haspopup is correct", () => {
			cy.mount(
				<div style={{width: "200px"}}>
					<AvatarGroup type="Individual">
						<Avatar size="XL" interactive icon="home" initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
					</AvatarGroup>
				</div>
			);

			cy.get("[ui5-avatar-group]").then(($avatarGroup) => {
				($avatarGroup[0] as any).accessibilityAttributes = { hasPopup: "menu" };
			});

			cy.get("[ui5-avatar-group]")
				.then(($avatarGroup) => {
					const avatarGroup = $avatarGroup[0] as AvatarGroup;
					
					expect(avatarGroup._containerAriaHasPopup).to.be.undefined;
					
					expect(avatarGroup._overflowButtonAccAttributes).to.exist;
					expect(avatarGroup._overflowButtonAccAttributes.hasPopup).to.equal("menu");
				});
		});

		it("aria-label is correct", () => {
			cy.mount(
				<div style={{width: "200px"}}>
					<AvatarGroup type="Individual">
						<Avatar size="XL" interactive icon="home" initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
					</AvatarGroup>
				</div>
			);

			cy.get("[ui5-avatar-group]")
				.then(($avatarGroup) => {
					const ariaLabel = ($avatarGroup[0] as AvatarGroup)._ariaLabelText;
					expect(ariaLabel).to.include("Individual avatars");
					expect(ariaLabel).to.not.include("Show complete list");
					expect(ariaLabel).to.include("Press ARROW keys");
				});

			cy.get("[ui5-avatar-group]")
				.then(($avatarGroup) => {
					const overflowButtonLabel = ($avatarGroup[0] as AvatarGroup)._overflowButtonAriaLabelText;
					expect(overflowButtonLabel).to.include("Activate for complete list");
				});
		});
	});

	describe("Type Group", () => {
		it("role is correct", () => {
			cy.mount(
				<AvatarGroup type="Group">
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" initials="M"></Avatar>
				</AvatarGroup>
			);

			cy.get("[ui5-avatar-group]")
				.should("have.prop", "_role", "button");
		});

		it("aria-haspopup is correct", () => {
			cy.mount(
				<AvatarGroup type="Group">
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" initials="M"></Avatar>
				</AvatarGroup>
			);

			cy.get("[ui5-avatar-group]").then(($avatarGroup) => {
				($avatarGroup[0] as AvatarGroup).accessibilityAttributes = { hasPopup: "menu" };
			});

			cy.get("[ui5-avatar-group]")
				.then(($avatarGroup) => {
					const avatarGroup = $avatarGroup[0] as AvatarGroup;
					
					expect(avatarGroup._containerAriaHasPopup).to.equal("menu");
					
					if (avatarGroup._overflowButtonAccAttributes) {
						expect(avatarGroup._overflowButtonAccAttributes.hasPopup).to.be.undefined;
					}
				});
		});

		it("aria-label is correct", () => {
			cy.mount(
				<AvatarGroup type="Group">
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" initials="M"></Avatar>
				</AvatarGroup>
			);

			cy.get("[ui5-avatar-group]")
				.then(($avatarGroup) => {
					const avatarGroup = $avatarGroup[0] as AvatarGroup;
					const ariaLabel = avatarGroup._ariaLabelText;
					const overflowButtonLabel = avatarGroup._overflowButtonAriaLabelText;

					expect(ariaLabel).to.include("Conjoined avatars");
					expect(ariaLabel).to.include("Activate for complete list");
					expect(ariaLabel).to.not.include("Press ARROW keys");
					
					expect(overflowButtonLabel).to.be.undefined;
				});
		});
	});
});