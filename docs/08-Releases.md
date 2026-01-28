# Releases

The article describes the release process management of UI5 Web Components.

## Release Strategy

The UI5 Web Components follow the well-known [NPM Semantic Versioning strategy](https://docs.npmjs.com/about-semantic-versioning)
and produce the following type of releases:

- **Patch releases**

Includes backward compatible bug fixes and increments the third digit, e.g. 2.0.1.


- **Minor releases**

Includes backward compatible new features and increments the middle digit and resets the last digit to zero, e.g. 2.1.0, 2.2.0, 2.3.0, etc.


- **Major releases**

Includes changes that break backward compatibility and increments the first digit and resets the middle and last digits to zero, e.g. 2.0.0.

## Release Schedule

Here is the established release process of UI5 Web Components:


### Version 2

The UI5 Web Components version 2 is the latest major and recommended for usage.

- **Monthly Stable Releases** - 2.1.0, 2.2.0....2.x.0.

Every start of the month, a new minor version is released - stable and recommended for consumers.
Check the [Release Timelines](https://github.com/orgs/SAP/projects/91?pane=info) for up-to-date information (the related content is at the bottom of the page).

- **Weekly Preview Releases** - 2.x.0-rc.0, 2.x.0-rc.1....2.x.0-rc.z.

Every week on Thursday, a new release candidate version is released, considered a preview of the upcoming minor version.
It's more up-to-date with the latest development and it's useful for consumers that would like to get frequent updates and test upcoming features in the minor version.

- **On-demand Patch Releases** - 2.x.1, 2.x.2....2.x.y.

Patches are released on-demand for high-priority issues.

### Version 1 

The UI5 Web Components version 1 is in maintenance until 30 June 2025.

- **Monthly Patch Releases** - 1.24.1, 1.24.2....1.24.y.

Every start of the month, a new patch of 1.24 version is released - stable and recommended for consumers that still rely on version 1.

**Note:** The changelog of all releases can be found on the [GitHub Release](https://github.com/UI5/webcomponents/releases) page.
