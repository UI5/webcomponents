declare const DOMReferenceConverter: {
    toAttribute(propertyValue: string | HTMLElement): string | null;
    fromAttribute(value: string | null): string | null;
};
export default DOMReferenceConverter;
