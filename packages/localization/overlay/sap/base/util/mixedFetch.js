sap.ui.define([], function() {
	"use strict";

	return function() {
		return Promise.reject(new Error("mixedFetch not supported in UI5 Web Components"));
	};
});
