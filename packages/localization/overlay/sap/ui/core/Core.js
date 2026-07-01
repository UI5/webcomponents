sap.ui.define([], function() {
	"use strict";

	var emptyBundle = {
		getText: function() { return ""; },
		hasText: function() { return false; }
	};

	var Core = {
		getLibraryResourceBundle: function() {
			return emptyBundle;
		},
		fireLocalizationChanged: function() {}
	};

	return Core;
});
