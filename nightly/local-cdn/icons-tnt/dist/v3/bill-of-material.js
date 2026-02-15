import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bill-of-material";
const pathData = "M487 511H26q-11 0-18.5-7T0 486V26Q0 15 7.5 7.5T26 0h461q11 0 18 7.5t7 18.5v460q0 11-7 18t-18 7zm-26-249V51H51v211h410zM183 156q0-25 15-44t41-19q3 0 7 .5t10 1.5q19 6 30 22 10 18 10 39 0 17-10 37-10 15-30 23-6 1-10 1.5t-7 .5q-25 0-41-18-15-20-15-44zm167-61l27 90 25-90h37v121h-26v-83l-4 15-22 68h-23q-3-11-5.5-19.5T354 181q-2-5-3-9.5t-3-7.5q0-3-1-4.5t-2-3.5v-3q-1-1-1-2v-1l-1-2-2-7q0-3-1-4 0-2-.5-2.5t-.5-2.5v84h-24V95h35zM73 216V95h48q17 0 29 5.5t14 24.5q2 10-5 19t-17 9q5 1 9 3.5t8 5.5q8 8 8 22 0 17-14 24.5t-29 7.5H73zm89 151v28h299v-28H162zm0-67v28h299v-28H162zm0 160h299v-26H162v26zm47-304q0 13 7 27 6 14 23 14t24-13.5 7-27.5q0-15-7-28t-24-13-23 13q-7 11-7 28zM51 367v28h73v-28H51zm0-67v28h73v-28H51zm0 160h73v-26H51v26zm69-264q8 0 15-3.5t7-12.5q0-16-23-16H99v32h21zm-21-52h20q11 0 14-2 5-2 5-11 0-15-19-15H99v28z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/bill-of-material";
export { pathData, ltr, accData };