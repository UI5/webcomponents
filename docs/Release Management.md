# Release Management

The article describes the release process management of UI5 Web Components.

## Release Strategy

The UI5 Web Components follow the well-known [NPM Semantic Versioning strategy](https://docs.npmjs.com/about-semantic-versioning)
and produce the following type of releases:

- **Patch releases**

Includes backward compatible bug fixes and increments the third digit, e.g. 1.0.1.


- **Minor releases**

Includes backward compatible new features and increments the middle digit and resets the last digit to zero, e.g. 1.1.0.


- **Major releases**

Includes changes that break backward compatibility and increments the first digit and resets the middle and last digits to zero, e.g. 2.0.0.

## Release Schedule

Here is the established release process of UI5 Web Components:


- **Monthly Stable Releases** - 1.11.0, 1.12.0....1.18.0

Every start of the month, a new minor version is released, which we consider stable and recommended for consumers.
Check the [Release Timelines](https://github.com/UI5/webcomponents/projects?type=classic) for up-to-date information (the related content is at the bottom of the page).

- **Weekly Preview Releases** - 1.13.0-rc.0, 1.13.0-rc.1, 1.13.0-rc.2 (preview of 1.13)

Every week on Thursday, a new release candidate version is released, considered a preview of the upcoming minor version.
It's more up-to-date with the latest development and it's useful for consumers that would like to get frequent updates and test upcoming features in the minor version.


- **On-demand Patch Releases** - 1.13.1, 1.13.2, 1.13.3

Patches are released on-demand for high-priority issues.


**Note:** The changelog of all releases can be found on the [GitHub Release](https://github.com/UI5/webcomponents/releases) page.
