# Using Custom Illustrations

*Learn how to create and register custom illustrations for the UI5 Web Components IllustratedMessage component.*

The [`ui5-illustrated-message`](https://ui5.github.io/webcomponents/components/fiori/IllustratedMessage/) component enhances user experience by displaying contextual illustrations in empty states, error conditions, onboarding flows, and other scenarios where visual communication improves usability.

While UI5 Web Components includes a comprehensive set of [built-in illustrations](https://ui5.github.io/webcomponents/components/fiori/enums/IllustrationMessageType/), you can extend this collection by registering your own custom illustrations that match your application's brand and design requirements.

## Overview

Custom illustrations in UI5 Web Components consist of four size variants that automatically adapt to different container dimensions and [design contexts](https://ui5.github.io/webcomponents/components/fiori/enums/IllustrationMessageDesign/):

| Variant    | Size        | Breakpoint | Container Width | Design Type |
|------------|-------------|------------|-----------------|-------------|
| **Scene**  | Large       | L          | > 681px         | Large       |
| **Dialog** | Medium      | M          | ≤ 681px         | Medium      |
| **Spot**   | Small       | S          | ≤ 360px         | Small       |
| **Dot**    | Extra Small | XS         | ≤ 260px         | ExtraSmall  |

Each custom illustration must include all four variants to ensure optimal display across different use cases and responsive breakpoints.

## Prerequisites

Before implementing custom illustrations, ensure you have:

### 1. Installed the required packages

```bash
npm install @ui5/webcomponents @ui5/webcomponents-fiori
```

The [`@ui5/webcomponents`](https://www.npmjs.com/package/@ui5/webcomponents) package provides the base framework and asset registry functionality, while [`@ui5/webcomponents-fiori`](https://www.npmjs.com/package/@ui5/webcomponents-fiori) contains the `IllustratedMessage` component.

### 2. Prepared SVG Assets

Create four SVG files for each illustration following the naming convention:
```
{set}-{Variant}-{IllustrationName}.js
```

**Example file structure:**
```
assets/
├── custom-Scene-EmptyCart.js     # Large variant
├── custom-Dialog-EmptyCart.js    # Medium variant  
├── custom-Spot-EmptyCart.js      # Small variant
└── custom-Dot-EmptyCart.js       # Extra small variant
```

## Implementation

### Safe Registration (Recommended)

The recommended approach is to use `registerIllustration` with template functions, which provides protection against XSS vulnerabilities:

**TypeScript/JSX:**
```tsx
import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Register the illustration with JSX templates
registerIllustration("EmptyCart", {
    sceneTemplate: () => (
        <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 30h120l-8 60H28l-8-60z" 
                  stroke="var(--sapContent_Illustrative_Color1)" 
                  stroke-width="2" 
                  fill="var(--sapContent_Illustrative_Color2)" />
        </svg>
    ),
    dialogTemplate: () => (
        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            {/* Dialog variant SVG */}
        </svg>
    ),
    spotTemplate: () => (
        <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            {/* Spot variant SVG */}
        </svg>
    ),
    dotTemplate: () => (
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            {/* Dot variant SVG */}
        </svg>
    ),
    title: "Your cart is empty" as I18nText,
    subtitle: "Add items to get started with your order" as I18nText,
    set: "custom"
});
```

### Unsafe Registration (Raw SVG Strings)

Alternatively, you can use `unsafeRegisterIllustration` with raw SVG strings:

**JavaScript:**
```js
import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";

// Import SVG assets
import sceneSvg from "./assets/custom-Scene-EmptyCart.js";
import dialogSvg from "./assets/custom-Dialog-EmptyCart.js";
import spotSvg from "./assets/custom-Spot-EmptyCart.js";
import dotSvg from "./assets/custom-Dot-EmptyCart.js";

// Register the illustration
unsafeRegisterIllustration("EmptyCart", {
    sceneSvg,
    dialogSvg,
    spotSvg,
    dotSvg,
    title: "Your cart is empty",
    subtitle: "Add items to get started with your order",
    set: "custom"
});
```

**TypeScript:**
```ts
import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Import SVG assets
import sceneSvg from "./assets/custom-Scene-EmptyCart.js";
import dialogSvg from "./assets/custom-Dialog-EmptyCart.js";
import spotSvg from "./assets/custom-Spot-EmptyCart.js";
import dotSvg from "./assets/custom-Dot-EmptyCart.js";

// Register the illustration with proper typing
unsafeRegisterIllustration("EmptyCart", {
    sceneSvg,
    dialogSvg,
    spotSvg,
    dotSvg,
    title: "Your cart is empty" as I18nText,
    subtitle: "Add items to get started with your order" as I18nText,
    set: "custom"
});
```

> **⚠️ Security Warning:**  
> The `unsafeRegisterIllustration` method accepts raw SVG strings without sanitization. Only use this function with SVG content that you trust and have validated yourself. Improperly sanitized SVG strings can lead to security vulnerabilities such as XSS (Cross-Site Scripting).

### SVG Asset Structure (for Unsafe Registration)

Each SVG asset file should export the SVG content as a string:

**custom-Dialog-EmptyCart.js:**
```js
export default `<svg 
    id="custom-Dialog-EmptyCart" 
    width="160" 
    height="120" 
    viewBox="0 0 160 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
>
    <!-- Cart outline -->
    <path 
        d="M20 30h120l-8 60H28l-8-60z" 
        stroke="var(--sapContent_Illustrative_Color1)" 
        stroke-width="2" 
        fill="var(--sapContent_Illustrative_Color2)"
    />
    <!-- Cart handle -->
    <path 
        d="M35 30V20a10 10 0 0 1 20 0v10" 
        stroke="var(--sapContent_Illustrative_Color3)" 
        stroke-width="2"
    />
    <!-- Empty state indicator -->
    <circle 
        cx="80" 
        cy="60" 
        r="15" 
        fill="var(--sapContent_Illustrative_Color4)" 
        opacity="0.3"
    />
</svg>`;
```

### Design Guidelines

**SVG Requirements:**
- Include a unique `id` attribute: `{set}-{Variant}-{IllustrationName}`
- Use responsive dimensions appropriate for each variant

**Theming Support:**
- Use CSS custom properties for colors
- Avoid hard-coded colors to ensure theme compatibility
- Test illustrations across different UI5 themes

**Security Compliance:**

Since `unsafeRegisterIllustration` renders SVG content without sanitization, you must ensure your SVG files are secure:

- ⚠️ **No inline JavaScript**: Avoid `<script>` tags or event handlers (`onclick`, `onload`, etc.)
- ⚠️ **No unsafe styles**: Avoid `style` attributes that violate CSP policies
- ⚠️ **Validate SVG content**: Only use SVG files from trusted sources that you have reviewed
- ⚠️ **XSS Risk**: Malicious SVG content can execute arbitrary JavaScript and compromise your application
- ✅ **Use CSS custom properties**: Prefer theme-aware styling
- ✅ **Test with strict CSP**: Validate in CSP-enabled environments
- ✅ **Static SVG only**: Use declarative SVG markup without dynamic or executable content

## Usage

### Basic Implementation

Use your registered illustration by referencing it with the format `{set}/{name}`:

**HTML:**
```html
<ui5-illustrated-message name="custom/EmptyCart">
    <ui5-button design="Emphasized">Start Shopping</ui5-button>
</ui5-illustrated-message>
```

**React:**
```jsx
import { Button, IllustratedMessage } from '@ui5/webcomponents-react';

function EmptyCartView() {
    return (
        <IllustratedMessage name="custom/EmptyCart">
            <Button design="Emphasized">Start Shopping</Button>
        </IllustratedMessage>
    );
}
```

### Configuration

Control illustration size and behavior using the [`design`](https://ui5.github.io/webcomponents/components/fiori/IllustratedMessage/#design) property:

```html
<!-- Auto-responsive (default) -->
<ui5-illustrated-message name="custom/EmptyCart" design="Auto">
    <ui5-button>Add Items</ui5-button>
</ui5-illustrated-message>

<!-- Fixed size -->
<ui5-illustrated-message name="custom/EmptyCart" design="Large">
    <ui5-button>Add Items</ui5-button>
</ui5-illustrated-message>
```

### Accessibility

For accessibility considerations, use the [`decorative`](https://ui5.github.io/webcomponents/components/fiori/IllustratedMessage/#decorative) property when appropriate:

```html
<!-- Decorative illustrations (no accessibility labels) -->
<ui5-illustrated-message name="custom/EmptyCart" decorative>
    <ui5-button>Add Items</ui5-button>
</ui5-illustrated-message>
```

**Note:** Use the `decorative` property when the illustration is purely visual and doesn't convey important information. This improves accessibility by preventing screen readers from announcing decorative content.

## Best Practices

- **Consistent Design Language**: Maintain visual consistency with your application's design system
- **Meaningful Illustrations**: Create illustrations that clearly communicate the intended message
- **Performance**: Optimize SVG file sizes while maintaining quality
- **Accessibility**: Ensure illustrations support users with visual impairments through proper titles and descriptions
- **Testing**: Validate illustrations across different themes, screen sizes, and browsers