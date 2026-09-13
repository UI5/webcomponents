/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Directive } from 'lit-html/directive.js';
declare class StyleMapDirective extends Directive {
    constructor(partInfo: any);
    render(styleInfo: any): string;
    update(part: any, [styleInfo]: [any]): symbol;
}
export declare const styleMap: (styleInfo: any) => import("lit-html/directive.js").DirectiveResult<typeof StyleMapDirective>;
export {};
