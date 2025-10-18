declare const createStyle: (content: string, name: string, value?: string, theme?: string) => void;
declare const updateStyle: (content: string, name: string, value?: string, theme?: string) => void;
declare const hasStyle: (name: string, value?: string) => boolean;
declare const removeStyle: (name: string, value?: string) => void;
declare const createOrUpdateStyle: (content: string, name: string, value?: string, theme?: string) => void;
declare const mergeStyles: (style1?: string, style2?: string) => string | undefined;
export { createStyle, hasStyle, updateStyle, removeStyle, createOrUpdateStyle, mergeStyles, };
