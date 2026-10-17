const Log = console;

// Log.fatal = console.error;
// Log.warning = console.warn;
Log.fatal = function () {};
Log.warning = function () {};
export default Log;