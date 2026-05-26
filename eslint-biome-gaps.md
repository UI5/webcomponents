# ESLint Rules Without Biome Equivalent

The following rules from `packages/tools/components-package/eslint.js` have no direct equivalent in Biome v2 and are not enforced after the ESLint → Biome migration.

## Base Rules

| ESLint Rule | Notes |
|---|---|
| `no-caller` | Disallows `arguments.caller`/`arguments.callee` — no Biome equivalent |
| `no-extend-native` | Disallows extending native prototypes — no Biome equivalent |
| `no-iterator` | Disallows `__iterator__` property — no Biome equivalent |
| `no-labels` | Disallows labeled statements — no Biome equivalent |
| `no-lone-blocks` | Disallows unnecessary block statements — no Biome equivalent |
| `no-new-func` | Disallows `new Function()` — no Biome equivalent |
| `no-new-wrappers` | Disallows `new String/Number/Boolean` — no Biome equivalent |
| `no-use-before-define` | Disallows use before declaration — no Biome equivalent |
| `no-array-constructor` | Disallows `new Array()` — no Biome equivalent |
| `no-new-object` | Disallows `new Object()` — no Biome equivalent |
| `camelcase` | Enforces camelCase naming — no Biome equivalent |
| `no-undef` | `correctness/noUndeclaredVariables` exists but excluded — too noisy without type info |
| `import/extensions: always` | Requires file extensions on imports — no Biome equivalent |
| `import/consistent-type-specifier-style` | Covered partially by `useImportType` but not identical |

## TypeScript Override Rules (set to "off" in ESLint — rules that don't exist in Biome)

| ESLint Rule | Notes |
|---|---|
| `@typescript-eslint/no-unsafe-member-access` | No Biome equivalent |
| `@typescript-eslint/no-floating-promises` | No Biome equivalent |
| `@typescript-eslint/no-unsafe-assignment` | No Biome equivalent |
| `@typescript-eslint/ban-ts-comment` | No Biome equivalent (`noBannedTypes` is unrelated) |
| `@typescript-eslint/no-unsafe-call` | No Biome equivalent |
| `@typescript-eslint/unbound-method` | No Biome equivalent |
| `@typescript-eslint/no-misused-promises` | No Biome equivalent |
| `lines-between-class-members` | Formatter/style rule — no Biome equivalent |

## Custom Plugin Rules

| ESLint Rule | Notes |
|---|---|
| `jsx-no-leaked-values/jsx-no-leaked-values` | Custom plugin for JSX leaked values — no Biome equivalent |
