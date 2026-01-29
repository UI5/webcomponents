import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bill-of-material";
const pathData = "M64 416v32h64v-32H64zm0-64v32h64v-32H64zm64-32v-32H64v32h64zm320 64v-32H160v32h288zm0 64v-32H160v32h288zM119 138h17q8 0 12.5-2t4.5-10q0-13-17-13h-17v25zm18 45q6 0 12.5-2.5T156 169q0-14-20-14h-17v28h18zm78-35q0 11 6 23.5t20 12.5 20.5-11 6.5-25-6-25-21-11q-14 0-20 11t-6 25zm233 108V64H64v192h384zm0 64v-32H160v32h288zM96 200V95h42q7 0 14 1t12 4q10 5 12 21v2q0 7-5.5 14.5T156 145q8 2 15 8t7 19q0 14-10.5 21t-27.5 7H96zm96-52q0-22 13-38.5T241 93q5 0 15 2 17 5 26 19t9 34q0 17-9 32t-26 20q-10 2-15 2-23 0-36-16t-13-38zM32 448V63q0-13 9-22t22-9h385q13 0 22.5 9t9.5 22v385q0 13-9.5 22.5T448 480H63q-13 0-22-9.5T32 448zM338 95l24 78 22-78h32v105h-23v-72l-3 13-19 59h-20q-6-19-9.5-29.5t-5-15.5-2-6.5-.5-2.5q-1-1-1-2t-1-3l-2-6v-4q-1-2-1-4v73h-21V95h30z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/bill-of-material";
export { pathData, ltr, accData };