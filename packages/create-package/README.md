![UI5 icon](https://raw.githubusercontent.com/SAP/ui5-webcomponents/main/docs/images/UI5_logo_wide.png)


# UI5 Web Components - Create Package

[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Provides an `npm init` script for creating new "UI5 Web Components" packages.

## Usage with npm

```
Usage:

# npm 6.x
    npm init @ui5/webcomponents-package [OPTIONS]
# npm 7+, an extra double-dash is needed:
    npm init @ui5/webcomponents-package -- [OPTIONS]

Options:
    --name <string>     - defines the package name
    --component-name <string>      - defines the component class name that will be created in your new package
    --tag <string>      - defines the tag name of the sample web component that will be created in your new package. The tag will be derived from the component name if not provided.
    --enable-typescript - enables TypeScript support for the package
    --skip              - skips configuration and generates package with a default value for each parameter that wasn't passed
```

The script creates a new directory, and fills it with a `package.json` file and all necessary source files, and resources for a new
components package.

## Usage with yarn

```
Usage:
    yarn create @ui5/webcomponents-package [OPTIONS]
Options:
    --name <string>     - defines the package name
    --component-name <string>      - defines the component class name that will be created in your new package
    --tag <string>      - defines the tag name of the sample web component that will be created in your new package
    --enable-typescript - enables TypeScript support for the package
    --skip              - skips configuration and generates package with a default value for each parameter that wasn't passed
```

The script creates a new directory, and fills it with a `package.json` file and all necessary source files, and resources for a new
components package.

## Resources
- [UI5 Web Components - README.md](https://github.com/UI5/webcomponents/blob/main/README.md)
- [UI5 Web Components - Home Page](https://sap.github.io/ui5-webcomponents)
- [UI5 Web Components - Playground and API Reference](https://ui5.github.io/webcomponents/playground/)

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](https://github.com/UI5/webcomponents/blob/main/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://ui5-slack-invite.cfapps.eu10.hana.ondemand.com/).

## Contribute
Please check our [Contribution Guidelines](https://github.com/UI5/webcomponents/blob/main/docs/6-contributing/02-conventions-and-guidelines.md).

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, Version 2.0 except as noted otherwise in the [LICENSE](https://github.com/UI5/webcomponents/blob/main/LICENSE.txt) file.
