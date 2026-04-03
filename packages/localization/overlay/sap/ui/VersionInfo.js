sap.ui.define([], function() {
	"use strict";

	return {
		load: function() { return Promise.resolve({}); },
		_load: function() { return Promise.resolve({}); },
		_getTransitiveDependencyForLibraries: function() { return []; },
		_getTransitiveDependencyForComponent: function() { return undefined; }
	};
});
