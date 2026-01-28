const dns = require("node:dns");
const assert = require("chai").assert;

exports.config = {
	//
	// ====================
	// Runner Configuration
	// ====================
	//
	// WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
	// on a remote machine).
	runner: 'local',

	//
	// ==================
	// Specify Test Files
	// ==================
	// Define which test specs should run. The pattern is relative to the directory
	// from which `wdio` was called. Notice that, if you are calling `wdio` from an
	// NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
	// directory is where your package.json resides, so `wdio` will be called from there.
	//
	specs: [
		'./test/specs/**/*.js'
	],
	// Patterns to exclude.
	exclude: [
		// 'path/to/excluded/files'
	],
	//
	// ============
	// Capabilities
	// ============
	// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
	// time. Depending on the number of capabilities, WebdriverIO launches several test
	// sessions. Within your capabilities you can overwrite the spec and exclude options in
	// order to group specific specs to a specific capability.
	//
	// First, you can define how many instances should be started at the same time. Let's
	// say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
	// set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
	// files and you set maxInstances to 10, all spec files will get tested at the same time
	// and 30 processes will get spawned. The property handles how many capabilities
	// from the same test should run tests.
	//
	maxInstances: 10,
	//
	// If you have trouble getting all important capabilities together, check out the
	// Sauce Labs platform configurator - a great tool to configure your capabilities:
	// https://docs.saucelabs.com/reference/platforms-configurator
	//
	capabilities: [{
		// maxInstances can get overwritten per capability. So if you have an in-house Selenium
		// grid with only 5 firefox instances available you can make sure that not more than
		// 5 instances get started at a time.
		maxInstances: 5,
		//
		browserName: 'chrome',
		'goog:chromeOptions': {
			// to run chrome headless the following flags are required
			// (see https://developers.google.com/web/updates/2017/04/headless-chrome)
			args: [
				'--headless',
				'--disable-search-engine-choice-screen',
				'--start-maximized',
				'--no-sandbox',
				'--disable-gpu',
				'--disable-infobars',
				'--disable-extensions',
				'--disable-dev-shm-usage',
			],
			// args: ['--disable-gpu'],
		}
	}],
	//
	// port to find chromedriver
	port: 9515, // default
	// ===================
	// Test Configurations
	// ===================
	// Define all options that are relevant for the WebdriverIO instance here
	//
	// Level of logging verbosity: trace | debug | info | warn | error
	logLevel: 'error',
	//
	// Warns when a deprecated command is used
	deprecationWarnings: true,
	//
	// If you only want to run your tests until a specific amount of tests have failed use
	// bail (default is 0 - don't bail, run all tests).
	bail: 0,
	//
	// Set a base URL in order to shorten url command calls. If your `url` parameter starts
	// with `/`, the base url gets prepended, not including the path portion of your baseUrl.
	// If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
	// gets prepended directly.
	baseUrl: 'http://localhost:4567', // This is important since WDIO 7+ does not accept an empty string for baseUrl
	path: '',
	//
	// Default timeout for all waitFor* commands.
	waitforTimeout: 10000,
	//
	// Default timeout in milliseconds for request
	// if Selenium Grid doesn't send response
	connectionRetryTimeout: 90000,
	//
	// Default request retries count
	connectionRetryCount: 3,
	//
	// Test runner services
	// Services take over a specific job you don't want to take care of. They enhance
	// your test setup with almost no effort. Unlike plugins, they don't add new
	// commands. Instead, they hook themselves up into the test process.
	services: ['chromedriver', ['static-server', {
			folders: [
				{ mount: '/', path: './dist' },
			],
			port: '4567',
		}],
	],
	// options
	chromeDriverArgs: ['--port=9515'], // default
	// Framework you want to run your specs with.
	// The following are supported: Mocha, Jasmine, and Cucumber
	// see also: https://webdriver.io/docs/frameworks.html
	//
	// Make sure you have the wdio adapter package for the specific framework installed
	// before running any tests.
	framework: 'mocha',
	//
	// Test reporter for stdout.
	// The only one supported by default is 'dot'
	// see also: https://webdriver.io/docs/dot-reporter.html
	reporters: ['dot', 'spec'],

	//
	// Options to be passed to Mocha.
	// See the full list at http://mochajs.org/
	mochaOpts: {
		ui: 'bdd',
		timeout: 60000
	},
	//
	// =====
	// Hooks
	// =====
	// WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
	// it and to build services around it. You can either apply a single function or an array of
	// methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
	// resolved to continue.
	/**
	 * Gets executed once before all workers get launched.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 */
	// onPrepare: function (config, capabilities) {
	// },
	/**
	 * Gets executed just before initialising the webdriver session and test framework. It allows you
	 * to manipulate configurations depending on the capability or spec.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that are to be run
	 */
	// beforeSession: function (config, capabilities, specs) {
	// },
	beforeSession: () => {
        dns.setDefaultResultOrder('ipv4first');
    },
	/**
	 * Gets executed before test execution begins. At this point you can access to all global
	 * variables like `browser`. It is the perfect place to define custom commands.
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that are to be run
	 */
	before: async function (capabilities, specs) {
		await browser.addCommand("isFocusedDeep", async function () {
			return browser.executeAsync(function (elem, done) {
				let activeElement = document.activeElement;

				while (activeElement.shadowRoot) {
					if (activeElement.shadowRoot.activeElement) {
						activeElement = activeElement.shadowRoot.activeElement;
					} else {
						break;
					}
				}
				done(elem === activeElement);
			}, this);
		}, true);

		await browser.addCommand("isFocusedDeepElement", async function (element) {
			return browser.executeAsync(function (elem, element, done) {
				let activeElement = document.activeElement;

				while (activeElement.shadowRoot) {
					if (activeElement.shadowRoot.activeElement) {
						activeElement = activeElement.shadowRoot.activeElement;
					} else {
						break;
					}
				}
				done(element === activeElement);
			}, this, element);
		}, true);

		await browser.addCommand("setProperty", async function(property, value) {
			return browser.executeAsync((elem, property, value, done) => {
				elem[property] = value;
				done();
			}, this, property, value);
		}, true);

		await browser.addCommand("setAttribute", async function(attribute, value) {
			return browser.executeAsync((elem, attribute, value, done) => {
				elem.setAttribute(attribute, value);
				done();
			}, this, attribute, value);
		}, true);

		await browser.addCommand("removeAttribute", async function(attribute) {
			return browser.executeAsync((elem, attribute, done) => {
				elem.removeAttribute(attribute);
				done();
			}, this, attribute);
		}, true);

		await browser.addCommand("hasClass", async function(className) {
			return browser.executeAsync((elem, className, done) => {
				done(elem.classList.contains(className));
			}, this, className);
		}, true);

		await browser.addCommand("hasAttribute", async function(attrName) {
			return browser.executeAsync((elem, attrName, done) => {
				done(elem.hasAttribute(attrName));
			}, this, attrName);
		}, true);

		await browser.addCommand("matches", async function(selector) {
			return browser.executeAsync((elem, selector, done) => {
				done(elem.matches(selector));
			}, this, selector);
		}, true);

		await browser.addLocatorStrategy('activeElement', (selector) => {
			return document.querySelector(selector).shadowRoot.activeElement;
		});
	},
	/**
	 * Runs before a WebdriverIO command gets executed.
	 * @param {String} commandName hook command name
	 * @param {Array} args arguments that command would receive
	 */
	beforeCommand: async function (commandName, args) {
		const waitFor = [
			"$",
			"$$",
			"getAttribute",
			"hasAttribute", // custom
			"matches", // custom
			"getCSSProperty",
			"getHTML",
			"getProperty",
			"getSize",
			"getText",
			"getValue",
			"hasClass", // custom
			"isDisplayed",
			"isDisplayedInViewport",
			"isEnabled",
			"isExisting",
			"isFocused",
			"isFocusedDeep", // custom
			"isFocusedDeepElement", // custom
			"shadow$",
			"shadow$$"
		];
		if (waitFor.includes(commandName)) {
			await browser.executeAsync(function (done) {
				window["sap-ui-webcomponents-bundle"].renderFinished().then(done);
			});
		}
	},

	/**
	 * Hook that gets executed before the suite starts
	 * @param {Object} suite suite details
	 */
	// beforeSuite: function (suite) {
	// },
	/**
	 * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
	 * @param {Object} test test details
	 */
	// beforeTest: function (test) {
	// },
	/**
	 * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
	 * beforeEach in Mocha)
	 */
	// beforeHook: function () {
	// },
	/**
	 * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
	 * afterEach in Mocha)
	 */
	// afterHook: function () {
	// },
	/**
	 * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
	 * @param {Object} test test details
	 */
	afterTest: async function (test) {
		// fetch the browser logs and fail the test if there are `console.error` messages with the `[UI5-FWK]` marker
		const logs = await browser.getLogs('browser');
		const severeLogs = logs
			.filter(l => l.level === "SEVERE" && l.message.includes("[UI5-FWK]"))
			.map(l => l.message);

		if (severeLogs.length) {
			test.callback(new Error(`[${test.title}]\n\n    ${severeLogs.join("\n    ")}`));
		}
	},
	/**
	 * Hook that gets executed after the suite has ended
	 * @param {Object} suite suite details
	 */
	// afterSuite: function (suite) {
	// },

	/**
	 * Runs after a WebdriverIO command gets executed
	 * @param {String} commandName hook command name
	 * @param {Array} args arguments that command would receive
	 * @param {Number} result 0 - command success, 1 - command error
	 * @param {Object} error error object if any
	 */
	afterCommand: async function (commandName, args, result, error) {

		// url -> set configuration first
		if (commandName === "url" && !args[0].includes("do-not-change-configuration")) {
			await browser.executeAsync(function(done) {
				window["sap-ui-webcomponents-bundle"].configuration.setNoConflict(true);
				done();
			});
		}

		const waitFor = [
			"addValue",
			"clearValue",
			"click",
			"doubleClick",
			"dragAndDrop",
			"pause",
			"removeAttribute", // custom
			"scrollIntoView",
			"setAttribute", // custom
			"setProperty", // custom
			"setValue",
			"setWindowSize",
			"touchAction",
			"url",
		];

		const waitForWithDelay = [
			"keys",
		];

		if (waitFor.includes(commandName)) {
			await browser.executeAsync(function (done) {
				window["sap-ui-webcomponents-bundle"].renderFinished().then(done);
			});
		} else if (waitForWithDelay.includes(commandName)) {
			await browser.executeAsync(function (done) {
				setTimeout(() => {
					window["sap-ui-webcomponents-bundle"].renderFinished().then(done);
				}, 10);
			});
		}
	},
	/**
	 * Gets executed after all tests are done. You still have access to all global variables from
	 * the test.
	 * @param {Number} result 0 - test pass, 1 - test fail
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that ran
	 */
	// after: function (result, capabilities, specs) {
	// },
	/**
	 * Gets executed right after terminating the webdriver session.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that ran
	 */
	// afterSession: function (config, capabilities, specs) {
	// },
	/**
	 * Gets executed after all workers got shut down and the process is about to exit.
	 * @param {Object} exitCode 0 - success, 1 - fail
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {<Object>} results object containing test results
	 */
	onComplete: function (exitCode, config, capabilities, results) {
        // The results object looks like: { finished: 0, passed: 0, retries: 0, failed: 0 }.
        // If all values are 0, consider that no tests were found or executed.
        if (exitCode === 1 && Object.values(results).every(result => result === 0)) {
            console.log("✅ No specs were found or executed – treating as success.");
            process.exit(0);
        }
    }
	/**
	 * Gets executed when a refresh happens.
	 * @param {String} oldSessionId session ID of the old session
	 * @param {String} newSessionId session ID of the new session
	 */
	//onReload: function(oldSessionId, newSessionId) {
	//}
}
