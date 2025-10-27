
import type MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";

Cypress.Commands.add("ui5TabContainerOpenEndOverflow",{ prevSubject: true } , (subject) => {
	cy.wrap(subject)
		.shadow()
		.find("[data-ui5-stable='overflow-end']")
		.should("be.visible")
		.trigger("click");

	cy.wrap(subject)
		.shadow()
		.find(".ui5-tab-container-responsive-popover")
		.should("be.visible")
});

const getOffset = (element: HTMLElement, placement: `${MovePlacement}`, orientation: `${Orientation}`) => {
	const rect = element.getBoundingClientRect();
	const cX = rect.width / 2;
	const cY = rect.height / 2;
	const OFFSET = 5;
	let x;
	let y;
	
	if (placement === "Before") {
		x = orientation === "Horizontal" ? OFFSET : cX;
		y = orientation === "Horizontal" ? cY : OFFSET;
	} else if (placement === "After") {
		x = orientation === "Horizontal" ? rect.width - OFFSET : cX;
		y = orientation === "Horizontal" ? cY : rect.height - OFFSET;
	} else {
		x = cX;
		y = cY;
	}

	return {
		x,
		y
	};
};

Cypress.Commands.add("ui5TabContainerDragAndDrop", (elementToDrag, placement, target, orientation = "Horizontal") => {
	const targetOffset = getOffset(target, placement, orientation);

	cy.wrap(Cypress.$(elementToDrag))
		.should("be.visible")
		.trigger("dragstart", {
			force: true, // force the event on the given element, otherwise cypress searches for an actionable child, resulting in wrong target
			eventConstructor: "DragEvent",
			dataTransfer: new DataTransfer()
		});

	cy.wrap(Cypress.$(target))
		.should("be.visible")
		.trigger(
			"dragover",
			targetOffset.x,
			targetOffset.y,
			{
				force: true,
				eventConstructor: "DragEvent"
			}
	);

	cy.wrap(Cypress.$(target))
		.should("be.visible")
		.trigger(
			"drop",
			targetOffset.x,
			targetOffset.y,
			{
				force: true,
				eventConstructor: "DragEvent"
			}
		);

	cy.wrap(Cypress.$(elementToDrag))
		.trigger("dragend", {
			force: true,
			eventConstructor: "DragEvent",
		});
});
