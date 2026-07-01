sap.ui.define([], function() {
	"use strict";

	return {
		validateAndFallbackTheme: function(theme) { return theme; },
		isKnownTheme: function() { return false; },
		getMetadata: function() { return {}; },
		isSapTheme: function() { return false; }
	};
});
