import type NumberFormatT from "@ui5/openui5-types/sap/ui/core/format/NumberFormat";
// @ts-ignore
import NumberFormatNative from "./sap/ui/core/format/NumberFormat.js";

const NumberFormatWrapped = NumberFormatNative as typeof NumberFormatT;
class NumberFormat extends NumberFormatWrapped {}

export default NumberFormat;
