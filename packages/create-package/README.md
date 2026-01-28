# ![UI5 icon](https://raw.githubusercontent.com/UI5/webcomponents/main/docs/images/UI5_logo_water.png)UI5 Web Components - Create Package

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
    --name <string>                      - defines the package name
    --test-setup <"cypress" | "manual">  - defines whether the predefined test setup should be added or it will be configured manually.
    --skip                               - skips configuration and generates package with a default value for each parameter that wasn't passed
```

The script creates a new directory, and fills it with a `package.json` file and all necessary source files, and resources for a new
components package.

## Usage with yarn

```
Usage:
    yarn create @ui5/webcomponents-package [OPTIONS]
Options:
    --name <string>                      - defines the package name
    --test-setup <"cypress" | "manual">  - defines whether the predefined test setup should be added or it will be configured manually.
    --skip                               - skips configuration and generates package with a default value for each parameter that wasn't passed
```

The script creates a new directory, and fills it with a `package.json` file and all necessary source files, and resources for a new
components package.

## Resources
- [UI5 Web Components - README.md](https://github.com/UI5/webcomponents/blob/main/README.md)
- [UI5 Web Components - Home Page](https://ui5.github.io/webcomponents)
- [UI5 Web Components - Playground and API Reference](https://ui5.github.io/webcomponents/play/)

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](https://github.com/UI5/webcomponents/blob/main/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://ui5-slack-invite.cfapps.eu10.hana.ondemand.com/).

## Contribute
Please check our [Contribution Guidelines](https://github.com/UI5/webcomponents/blob/main/docs/6-contributing/02-conventions-and-guidelines.md).

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, Version 2.0 except as noted otherwise in the [LICENSE](https://github.com/UI5/webcomponents/blob/main/LICENSE.txt) file.
