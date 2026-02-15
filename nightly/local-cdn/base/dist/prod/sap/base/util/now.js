// @evo-todo window.performance does not exist on node.js, but there is a module performance-now. Maybe use it

/**
 * Returns a high resolution timestamp in microseconds if supported by the environment, otherwise in milliseconds.
 * The timestamp is based on 01/01/1970 00:00:00 (UNIX epoch) as float with microsecond precision or
 * with millisecond precision, if high resolution timestamps are not available.
 * The fractional part of the timestamp represents fractions of a millisecond.
 * Converting to a <code>Date</code> is possible by using <code>require(["sap/base/util/now"], function(now){new Date(now());}</code>
 *
 * @function
 * @since 1.58
 * @public
 * @alias module:sap/base/util/now
 * @returns {float} timestamp in microseconds if supported by the environment otherwise in milliseconds
 */ /*!
     * OpenUI5
     * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
     * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
     */
/*global performance */

var fnNow = !(typeof window != "undefined" && window.performance && performance.now && performance.timing) ? Date.now : function () {
  var iNavigationStart = performance.timing.navigationStart;
  return function perfnow() {
    return iNavigationStart + performance.now();
  };
}();
export default fnNow;