/**
 * This module must be imported BEFORE any compat component imports.
 * It sets a scoping suffix so compat components register under unique tag names
 * (e.g., ui5-table-compat instead of ui5-table) to avoid conflicts with main components.
 */
import { setCompatCustomElementsScopingSuffix } from "@ui5/webcomponents-compat/dist/utils/CompatCustomElementsScope.js";

setCompatCustomElementsScopingSuffix("compat");
