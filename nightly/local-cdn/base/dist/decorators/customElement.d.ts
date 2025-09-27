import type UI5Element from "../UI5Element.js";
import type { Renderer } from "../UI5Element.js";
import type { TemplateFunction as Template } from "../renderer/executeTemplate.js";
import type { ComponentStylesData as Styles } from "../types.js";
/**
 * Returns a custom element class decorator.
 *
 * @param { string | object } tagNameOrComponentSettings
 * @returns { ClassDecorator }
 */
declare const customElement: (tagNameOrComponentSettings?: string | {
    /**
     * The tag name of the custom element (will be suffixed if the scoping feature is used).
     */
    tag?: string;
    /**
     * The renderer of the custom element - officially supported are: jsxRenderer and litRender (deprecated).
     */
    renderer?: Renderer;
    /**
     * The styles to be injected into the shadow root of the custom element.
     */
    styles?: Styles;
    /**
     * The template function of the custom element - must match the renderer.
     */
    template?: Template;
    /**
     * Other custom elements used in the shadow root of the custom element.
     * @deprecated no longer necessary for jsxRenderer-enabled components
     */
    dependencies?: Array<typeof UI5Element>;
    /**
     * Whether the custom element should be re-rendered when the language changes.
     */
    languageAware?: boolean;
    /**
     * Whether the custom element should be re-rendered when the theme changes.
     */
    themeAware?: boolean;
    /**
     * Whether the custom element needs the CLDR assets.
     */
    cldr?: boolean;
    /**
     * Whether the custom element supports the F6 Fast navigation feature (is a fast-navigation group).
     */
    fastNavigation?: boolean;
    /**
     * Whether the custom element is form-associated and implements form-relevant features.
     */
    formAssociated?: boolean;
    /**
     * The shadow root options of the custom element.
     */
    shadowRootOptions?: Partial<ShadowRootInit>;
    /**
     * A list of all features, supported by the custom element.
     * @deprecated no longer necessary for jsxRenderer-enabled components
     */
    features?: Array<string>;
}) => ClassDecorator;
export default customElement;
