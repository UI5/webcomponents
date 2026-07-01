sap.ui.define([], function() {
	"use strict";

	return {
		create: function() {
			return Promise.resolve({
				getProperty: function() { return null; },
				getKeys: function() { return []; }
			});
		}
	};
});
