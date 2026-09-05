/**
 * Creates a `<link>` tag in the `<head>` tag
 * @param href - the CSS
 * @param attributes - optional attributes to add to the tag
 */
declare const createLinkInHead: (href: string, attributes?: Record<string, string>) => Promise<Event>;
export default createLinkInHead;
