sap.ui.define([], function() {
	"use strict";

	var sTheme = "sap_horizon";
	var mThemeRoots = {};
	var aChangeListeners = [];
	var aAppliedListeners = [];

	var Theming = {
		getTheme: function() { return sTheme; },
		setTheme: function(theme) { sTheme = theme; },
		getThemeRoot: function() { return mThemeRoots[sTheme] || ""; },
		setThemeRoot: function(theme, lib, sThemeBaseUrl) {
			if (typeof lib === "string") {
				mThemeRoots[theme] = lib;
			} else {
				mThemeRoots[theme] = sThemeBaseUrl;
			}
		},
		attachChange: function(fn) { aChangeListeners.push(fn); },
		detachChange: function(fn) {
			aChangeListeners = aChangeListeners.filter(function(f) { return f !== fn; });
		},
		attachApplied: function(fn) { aAppliedListeners.push(fn); },
		detachApplied: function(fn) {
			aAppliedListeners = aAppliedListeners.filter(function(f) { return f !== fn; });
		}
	};

	return Theming;
});
