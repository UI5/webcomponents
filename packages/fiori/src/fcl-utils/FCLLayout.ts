import type { MEDIA } from "../FlexibleColumnLayout.js";
import type FCLLayout from "../types/FCLLayout.js";

type DefaultLayoutConfiguration = {
	[device in MEDIA]: {
		[layoutName in FCLLayout]: {
			layout: Array<string>;
			separators: Array<{
				visible: boolean;
				gripVisible?: boolean;
				arrowVisible?: boolean;
				arrowDirection?: "forward" | "backward";
			}>;
		};
	};
};

const getDefaultLayoutsByMedia = (): DefaultLayoutConfiguration => {
	return {
		desktop: {
			"OneColumn": {
				layout: ["100%", "0px", "0px"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"TwoColumnsStartExpanded": {
				layout: ["67%", "33%", "0px"],
				separators: [
					{ visible: true, gripVisible: true },
					{ visible: false },
				],
			},
			"TwoColumnsMidExpanded": {
				layout: ["33%", "67%", "0px"],
				separators: [
					{ visible: true, gripVisible: true },
					{ visible: false },
				],
			},
			"ThreeColumnsMidExpanded": {
				layout: ["25%", "50%", "25%"],
				separators:	[
					{
						visible: true,
						gripVisible: true,
						arrowVisible: true,
						arrowDirection: "backward",
					},
					{ visible: true, gripVisible: true },
				],
			},
			"ThreeColumnsEndExpanded": {
				layout: ["25%", "25%", "50%"],
				separators: [
					{
						visible: true,
						gripVisible: false,
						arrowVisible: true,
						arrowDirection: "backward",
					},
					{ visible: true, gripVisible: true },
				],
			},
			"ThreeColumnsStartExpandedEndHidden": {
				layout: ["67%", "33%", "0px"],
				separators: [
					{ visible: true, gripVisible: true },
					{ visible: false },
				],
			},
			"ThreeColumnsMidExpandedEndHidden": {
				layout: ["33%", "67%", "0px"],
				separators: [
					{ visible: true, gripVisible: true },
					{ visible: true, gripVisible: true },
				],
			},
			"ThreeColumnsStartHiddenMidExpanded": {
				layout: ["0px", "33%", "67%"],
				separators: [
					{
						visible: true,
						gripVisible: true,
						arrowVisible: true,
						arrowDirection: "forward",
					},
					{ visible: true, gripVisible: true },
				],
			},
			"ThreeColumnsStartHiddenEndExpanded": {
				layout: ["0px", "33%", "67%"],
				separators: [
					{
						visible: true,
						gripVisible: false,
						arrowVisible: true,
						arrowDirection: "forward",
					},
					{ visible: true, gripVisible: true },
				],
			},
			"MidColumnFullScreen": {
				layout: ["0px", "100%", "0px"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"EndColumnFullScreen": {
				layout: ["0px", "0px", "100%"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
		},
		tablet: {
			"OneColumn": {
				layout: ["100%", "0px", "0px"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"TwoColumnsStartExpanded": {
				layout: ["67%", "33%", "0px"],
				separators: [
					{ visible: true, gripVisible: true },
					{ visible: false },
				],
			},
			"TwoColumnsMidExpanded": {
				layout: ["33%", "67%", "0px"],
				separators: [
					{ visible: true, gripVisible: true },
					{ visible: false },
				],
			},
			"ThreeColumnsMidExpanded": {
				layout: ["0px", "67%", "33%"],
				separators: [
					{ visible: true, gripVisible: true },
					{ visible: true, gripVisible: true },
				],
			},
			"ThreeColumnsEndExpanded": {
				layout: ["0px", "33%", "67%"],
				separators: [
					{ visible: false },
					{ visible: true, gripVisible: true },
				],
			},
			"ThreeColumnsStartExpandedEndHidden": {
				layout: ["67%", "33%", "0px"],
				separators: [
					{ visible: true, gripVisible: true },
					{ visible: false },
				],
			},
			"ThreeColumnsMidExpandedEndHidden": {
				layout: ["33%", "67%", "0px"],
				separators: [
					{ visible: true, gripVisible: true },
					{ visible: true, gripVisible: true },
				],
			},
			"ThreeColumnsStartHiddenMidExpanded": {
				layout: ["0px", "67%", "33%"],
				separators: [
					{ visible: true, gripVisible: true },
					{ visible: true, gripVisible: true },
				],
			},
			"ThreeColumnsStartHiddenEndExpanded": {
				layout: ["0px", "33%", "67%"],
				separators: [
					{ visible: false },
					{ visible: true, gripVisible: true },
				],
			},
			"MidColumnFullScreen": {
				layout: ["0px", "100%", "0px"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"EndColumnFullScreen": {
				layout: ["0px", "0px", "100%"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
		},
		phone: {
			"OneColumn": {
				layout: ["100%", "0px", "0px"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"TwoColumnsStartExpanded": {
				layout: ["0px", "100%", "0px"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"TwoColumnsMidExpanded": {
				layout: ["0px", "100%", "0px"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"ThreeColumnsMidExpanded": {
				layout: ["0px", "0px", "100%"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"ThreeColumnsEndExpanded": {
				layout: ["0px", "0px", "100%"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"ThreeColumnsStartExpandedEndHidden": {
				layout: ["0px", "0px", "100%"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"ThreeColumnsMidExpandedEndHidden": {
				layout: ["0px", "0px", "100%"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"ThreeColumnsStartHiddenMidExpanded": {
				layout: ["0px", "0px", "100%"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"ThreeColumnsStartHiddenEndExpanded": {
				layout: ["0px", "0px", "100%"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"MidColumnFullScreen": {
				layout: ["0px", "100%", "0px"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
			"EndColumnFullScreen": {
				layout: ["0px", "0px", "100%"],
				separators: [
					{ visible: false },
					{ visible: false },
				],
			},
		},
	};
};

const getNextLayoutByArrowPress = () => {
	return {
		"ThreeColumnsMidExpanded": "ThreeColumnsStartHiddenMidExpanded",
		"ThreeColumnsEndExpanded": "ThreeColumnsStartHiddenEndExpanded",
		"ThreeColumnsStartHiddenMidExpanded": "ThreeColumnsMidExpanded",
		"ThreeColumnsStartHiddenEndExpanded": "ThreeColumnsEndExpanded",
	};
};

export {
	getDefaultLayoutsByMedia,
	getNextLayoutByArrowPress,
};

export type {
	FCLLayout,
};
