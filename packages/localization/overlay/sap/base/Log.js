sap.ui.define([], function() {
	const Log = console;

	// Log.fatal = console.error;
	// Log.warning = console.warn;
	Log.fatal = function() {};
	Log.warning = function() {};

	return Log;
});
