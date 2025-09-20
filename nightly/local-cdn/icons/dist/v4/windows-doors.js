import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "windows-doors";
const pathData = "M0 0h256v512H0V0zm224 480V32H32v448h192zm64-256V0h224v224H288zm32-128h64V32h-64v64zm96 96h64v-64h-64v64zm-96-64v64h64v-64h-64zm96-96v64h64V32h-64zM161 240q0-16 16-16t16 16-16 16-16-16z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/windows-doors";
export { pathData, ltr, accData };