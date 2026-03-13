# Conventions and Guidelines

## JavaScript Coding Guidelines
We enforce code style rules using [ESLint](https://eslint.org). Execute `npm run lint` to check your code for style issues.  
You may also find an ESLint integration for your favorite IDE [here](https://eslint.org/docs/user-guide/integrations).

## Testing
Integration tests are implemented with [Cypress](https://www.cypress.io/). You can run all tests using `npm run test`.
If reasonable, take the time and write a test for the proposed change or fix. Learn more about testing at the [Testing UI5 Web Components page](../4-development/10-testing.md).

## Git Guidelines

We adhere to the [Conventional Commits](https://conventionalcommits.org) specification.

The commit message consists of three parts:
- header
- body (optional)
- footer (optional)

### Commit Header
The commit header is the first line of the commit message. It consists of three parts: type, scope and description.

#### Commit Type
- It must be one of the following:
    + `fix` - a bug fix (note: this will indicate a release). If possible, include a test in your change.
    + `feat` - a new feature (note: this will indicate a release)
    + `docs` - changes to the documentation or samples
    + `style` - changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    + `refactor` - a code change that neither fixes a bug nor adds a feature
    + `perf` - a code change that improves performance
    + `test` - adding missing tests
    + `chore` - changes to the build process or auxiliary tools and libraries such as documentation generation
    + `revert` - revert to a commit
    + `WIP` - work in progress

#### Commit Scope (optional)
- It points to a specific component which is affected by the change. For example, ui5-button, ui5-card and ui5-table.

#### Commit Description
- Use the **imperative present tense**. Instead of "I added feature xy" or "Adding tests for" use "Add feature xy" or "Add tests for".
- It should be no more than **100 characters** long.


### Commit Body (optional)
After the commit header, there should be an empty line followed by the optional commit body.
- Describe the intention and reasoning of the change.

### Commit Footer (optional)
After the optional commit body, there should be an empty line followed by the optional footer.
- If the change introduces a breaking change, it should start with **BREAKING CHANGE:** followed by a description of the change.
    + `BREAKING CHANGE: remove press event`
- If the change fixes an issue reported on GitHub, add the following line to the commit message:
    + `Fixes #<issueNumber>` (e.g. `Fixes #42`)


**Example:**

```
fix(ui5-button): correct focus with 'tab' key

The button should receive a correct focus outline
when the 'tab' key is pressed.

Fixes #42
```
