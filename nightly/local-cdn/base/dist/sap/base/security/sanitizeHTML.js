/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/*
 * IMPORTANT: This is a private module, its API must not be used and is subject to change.
 * Code other than the OpenUI5 libraries must not introduce dependencies to this module.
 */
import assert from "../assert.js";
import URLListValidator from "./URLListValidator.js";
import "../../ui/thirdparty/caja-html-sanitizer.js";
/**
 * Strips unsafe tags and attributes from HTML.
 *
 * @function
 * @since 1.58
 * @alias module:sap/base/security/sanitizeHTML
 * @param {string} sHTML the HTML to be sanitized.
 * @param {object} [mOptions={}] options for the sanitizer
 * @return {string} sanitized HTML
 * @private
 */
var fnSanitizeHTML = function (sHTML, mOptions) {
  assert(window.html && window.html.sanitize, "Sanitizer should have been loaded");
  mOptions = mOptions || {
    uriRewriter: function (sUrl) {
      // by default, we use the URLListValidator to check the URLs

      if (URLListValidator.validate(sUrl)) {
        return sUrl;
      }
    }
  };
  var oTagPolicy = mOptions.tagPolicy || window.html.makeTagPolicy(mOptions.uriRewriter, mOptions.tokenPolicy);
  return window.html.sanitizeWithPolicy(sHTML, oTagPolicy);
};
export default fnSanitizeHTML;