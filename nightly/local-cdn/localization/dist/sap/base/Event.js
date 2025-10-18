/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
// Provides class module:sap/base/Event

const EVENT_PARAMETERS_SYMBOL = Symbol("parameters");

/**
 * @author SAP SE
 * @version 1.120.17
 *
 * Creates an event with the given <code>sType</code>,
 * linked to the provided <code>oTarget</code> and enriched with the <code>oParameters</code>.
 *
 * @param {string} sType The type of the event
 * @param {object} oParameters Parameters for this event. The parameters will be accessible as properties of the Event instance.
 *
 * @alias module:sap/base/Event
 * @namespace
 * @private
 * @ui5-restricted sap.ui.core
 */
class Event {
  /**
   *The type of the event
   * @type {string}
   * @private
   * @ui5-restricted sap.ui.core
   */
  #type;
  constructor(sType, oParameters) {
    //copy & freeze parameters
    for (const param in oParameters) {
      this[param] = oParameters[param];
      Object.defineProperty(this, param, {
        configurable: false,
        writable: false
      });
    }
    this[EVENT_PARAMETERS_SYMBOL] = oParameters;
    this.#type = sType;
  }
  get type() {
    return this.#type;
  }
  /**
   * Returns the event parameters as map
   * @param {module:sap/base/Event} oEvent The event object to retrieve the parameters
   * @returns {object} Map of event parameters
   * @private
   * @ui5-restricted sap/base/i18n sap.ui.core
   */
  static getParameters(oEvent) {
    return Object.assign({}, oEvent[EVENT_PARAMETERS_SYMBOL]);
  }
}
export default Event;