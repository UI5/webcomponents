sap.ui.define([], function() {
	"use strict";

	var libs = {};

	var Lib = {
		init: function(cfg) {
			var name = cfg && cfg.name;
			if (name && !libs[name]) {
				libs[name] = {
					name: name,
					getName: function() { return name; },
					isSettingsEnhanced: function() { return false; },
					getResourceBundle: function() { return { getText: function() { return ""; } }; },
					_loadResourceBundle: function() { return Promise.resolve(); }
				};
			}
			return libs[name];
		},
		get: function(name) { return libs[name]; },
		all: function() { return Object.assign({}, libs); },
		load: function() { return Promise.resolve(); },
		_get: function(name) { return libs[name]; }
	};

	return Lib;
});
