/**
 * Enumerable list with available animation modes.
 *
 * This enumerable is used to validate the animation mode. Animation modes allow to specify
 * different animation scenarios or levels. The implementation of the Control (JavaScript or CSS)
 * has to be done differently for each animation mode.
 *
 * @enum {string}
 * @alias module:sap/ui/core/AnimationMode
 * @public
 * @since 1.120
 */ /*!
     * OpenUI5
     * (c) Copyright 2026 SAP SE or an SAP affiliate company.
     * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
     */

// Provides type module:sap/ui/core/AnimationMode.

var AnimationMode = {
  /**
   * <code>full</code> represents a mode with unrestricted animation capabilities.
   * @public
   */
  full: "full",
  /**
   * <code>basic</code> can be used for a reduced, more light-weight set of animations.
   * @public
   */
  basic: "basic",
  /**
   * <code>minimal</code> includes animations of fundamental functionality.
   * @public
   */
  minimal: "minimal",
  /**
   * <code>none</code> deactivates the animation completely.
   * @public
   */
  none: "none"
};
export default AnimationMode;