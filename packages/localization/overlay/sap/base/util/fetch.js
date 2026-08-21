sap.ui.define([], function() {
	"use strict";

	var fetch = function() {
		return Promise.reject(new Error("fetch not supported in UI5 Web Components"));
	};
	fetch.ContentTypes = {
		text: "text/plain",
		json: "application/json"
	};
	return fetch;
});
