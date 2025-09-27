import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "firewall";
const pathData = "M0 192h32v64H0v-64zm0 192h64v64H0v-64zM0 96h160v64H0V96zm0 193h160v63H0v-63zm64-97h160v64H64v-64zm192 192v64H96v-64h160zm-64-95h160v63H192v-63zm224-33H256v-64h160v64zm32 128v64H288v-64h160zM192 160V96h160v64H192zm320-64v64H384V96h128zM384 289h128v63H384v-63zm64-97h64v64h-64v-64zm32 192h32v64h-32v-64z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/firewall";
export { pathData, ltr, accData };