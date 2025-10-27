# GitHub Copilot Review Instructions for UI5 Web Components

When reviewing pull requests to UI5 Web Components project, follow these guidelines:

## Commit Message and PR Title Validation

Check that commit messages and PR titles follow the [Conventional Commits](https://conventionalcommits.org) specification as outlined in [Conventions and guidelines](../docs/5-contributing/02-conventions-and-guidelines.md):

### Required Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Valid Types
- `fix` - bug fix (triggers release)
- `feat` - new feature (triggers release)
- `docs` - documentation changes
- `style` - formatting changes (no code meaning change)
- `refactor` - code change that neither fixes bug nor adds feature
- `perf` - performance improvement
- `test` - adding missing tests
- `chore` - build process or auxiliary tool changes
- `revert` - revert to a commit
- `WIP` - work in progress

### Scope (optional)
- Should point to specific component (e.g., `ui5-button`, `ui5-card`, `ui5-table`)

### Description Requirements
- Use imperative present tense lowercase ("add" not "Added", "added" or "Adding", "adding)
- Maximum 100 characters
- No period at the end

### Example Valid Commit
```
fix(ui5-button): correct focus with 'tab' key

The button should receive a correct focus outline
when the 'tab' key is pressed.

Fixes #42
```

## Description Requirements

Ensure the PR includes:
- Clear description of what changed and why
- For breaking changes, include `BREAKING CHANGE:` in footer with description
- Context about the problem being solved
- (optional) Reference to related GitHub issues using `Fixes #<issueNumber>` format

## Code Quality Analysis

### Component Development (refer to [DoD.md](../docs/5-contributing/03-DoD.md))

**Properties:**
- ✅ For public properties, JSDoc is added (since tag is present)
- ✅ Check that public properties are not changed without user interaction
- ✅ If public properties are changed, a public event should be fired to notify the consumers
- ✅ Verify `noAttribute: true` is set for private properties not used in CSS
- ✅ Ensure CSS handles default values for enum properties

**Events:**
- ✅ Verify proper event handling and naming conventions
- ✅ Check event documentation and examples

**CSS:**
- ✅ Confirm styling properties are placed on `:host` when possible for app overriding
- ✅ Check responsive design considerations

**Scoping/Multi-framework Safety:**
- ❌ **Flag hard-coded tag names** in CSS/TS files - use attribute notation instead:
  ```css
  /* BAD */
  ui5-button.accept-btn { color: green; }
  
  /* GOOD */
  [ui5-button].accept-btn { color: green; }
  ```
- ❌ **Flag `instanceof` checks** for UI5 Elements - use duck-typing instead
- ✅ Verify all required icons are explicitly imported
- ✅ Check for attribute notation in `shadowRoot.querySelector` calls

### General Code Issues
- ❌ **Memory leaks** - check for proper cleanup of event listeners
- ❌ **Accessibility issues** - verify ARIA attributes and keyboard navigation
- ❌ **Performance problems** - unnecessary re-renders or heavy computations
- ❌ **Type safety** - proper TypeScript usage and type definitions
- ❌ **Security vulnerabilities** - XSS risks, unsafe DOM manipulation

## Test Coverage Requirements

### Required Tests
- ✅ **Cypress tests** for new components or changed functionality

### Test Frameworks
- **Cypress** for end-to-end testing with component interaction

### Test Quality Checks
- ❌ **Flag framework-testing code** - tests should verify component behavior, not framework features
- ✅ Ensure tests cover the actual changes made
- ✅ Verify mobile testing when applicable

## Review Checklist

Before approving, verify:

1. **Commit message follows conventional commits format**
2. **PR description explains the change and references issues**
3. **Code follows project conventions and guidelines**
4. **No scoping-unsafe code patterns**
5. **Proper test coverage included**
6. **No obvious bugs or security issues**
7. **TypeScript definitions updated if needed**
8. **Documentation updated for public API changes**

## Common Patterns to Flag

### ❌ Unsafe Patterns
```typescript
// Hard-coded tag names
this.shadowRoot.querySelector("ui5-popover")

// instanceof checks
if (element instanceof Button) { }

// Public property modification without user interaction
this.myPublicProperty = "newValue"
```

### ✅ Safe Patterns  
```typescript
// Attribute notation
this.shadowRoot.querySelector("[ui5-popover]")

// Duck-typing
if (element.tagName === "UI5-BUTTON") { }

// Property modification in event handlers only
onUserInteraction() {
  this.myPublicProperty = "newValue"
  this.fireEvent("change")
}
```

## Additional Resources

- [Development Workflow](../docs/5-contributing/01-development-workflow.md)
- [Conventions and Guidelines](../docs/5-contributing/02-conventions-and-guidelines.md)
- [Definition of Done](../docs/5-contributing/03-DoD.md)
- [Testing Documentation](../commitlint.config.cjsdocs/4-development/10-testing.md)