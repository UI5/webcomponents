/* eslint-disable @typescript-eslint/no-unused-vars */
import testAssets from "@ui5/webcomponents/dist/bundle.common.bootstrap.js";
// Compat assets
import "./Assets.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import * as defaultFioriTexts from "./generated/i18n/i18n-defaults.js";
import Table from "./Table.js";
import TableColumn from "./TableColumn.js";
import TableRow from "./TableRow.js";
import TableGroupRow from "./TableGroupRow.js";
import TableCell from "./TableCell.js";
testAssets.defaultTexts = { ...testAssets.defaultTexts, ...defaultFioriTexts };
export default testAssets;
//# sourceMappingURL=bundle.esm.js.map