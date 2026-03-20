sap.ui.define([], function() {
	"use strict";

	return {
		active: false,
		fatalThrows: function() {},
		errorThrows: function() {},
		warningThrows: function() {},
		assertThrows: function() {},
		warningRejects: function(fnResolve) { if (fnResolve) { fnResolve(); } }
	};
});
