import { getIgnoreUrlParams as getConfiguredIgnoreUrlParams } from "../InitialConfiguration.js";

let _ignoreUrlParams: boolean;

/**
 * Returns if the "ignoreUrlParams" configuration is set.
 * @public
 * @since 2.23.0
 * @returns { boolean }
 */
const getIgnoreUrlParams = (): boolean => {
	if (_ignoreUrlParams === undefined) {
		_ignoreUrlParams = getConfiguredIgnoreUrlParams();
	}

	return _ignoreUrlParams;
};

/**
 * Defines the "ignoreUrlParams" setting.
 *
 * - When set to "true", the framework will not process URL parameters
 * (e.g. sap-ui-theme, sap-ui-language) during initialization.
 * - When set to "false" (default), URL parameters are processed normally.
 *
 * @public
 * @since 2.23.0
 * @param { boolean } ignoreUrlParams
 */
const setIgnoreUrlParams = (ignoreUrlParams: boolean) => {
	_ignoreUrlParams = ignoreUrlParams;
};

export {
	getIgnoreUrlParams,
	setIgnoreUrlParams,
};
