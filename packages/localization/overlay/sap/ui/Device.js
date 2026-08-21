sap.ui.define([], function() {
	"use strict";

	return {
		browser: { firefox: false, webkit: false, chrome: false, name: "", version: -1 },
		os: { windows: false, macintosh: false, linux: false, android: false, ios: false },
		system: { desktop: true, phone: false, tablet: false },
		support: { touch: false },
		media: {},
		orientation: {},
		resize: {}
	};
});
