/*
MIT License

Copyright (c) 2017

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const glob = require('glob');
const globParent = require('glob-parent');

/* CODE */

const copyAndWatchFn = async (argv) => {
	const args = argv.slice(2);
	const options = {};

	['watch', 'clean', 'skip-initial-copy', 'safe', 'silent'].forEach(key => {
		const index = args.indexOf(`--${key}`);
		if (index >= 0) {
			options[key] = true;
			args.splice(index, 1);
		}
	});

	if (args.length < 2) {
		console.error('Not enough arguments: copy-and-watch [options] <sources> <target>');
		process.exit(1);
	}

	if (options['skip-initial-copy'] && !options['watch']) {
		console.error('--skip-initial-copy argument is meant to be used with --watch, otherwise no files will be copied');
		process.exit(1);
	}

	const target = args.pop();
	const sources = args;
	const parents = [...new Set(sources.map(globParent))];

	const findTarget = from => {
		const parent = parents
			.filter(p => from.indexOf(p) >= 0)
			.sort()
			.reverse()[0];
		return path.join(target, path.relative(parent, from));
	};
	const createDirIfNotExist = to => {
		'use strict';

		const dirs = [];
		let dir = path.dirname(to);

		while (dir !== path.dirname(dir)) {
			dirs.unshift(dir);
			dir = path.dirname(dir);
		}

		dirs.forEach(dir => {
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
		});
	};
	const copy = from => {
		const to = findTarget(from);
		createDirIfNotExist(to);
		const stats = fs.statSync(from);
		if (stats.isDirectory()) {
			return;
		}
		fs.writeFileSync(to, fs.readFileSync(from));
		options.silent || console.log('[COPY]', from, 'to', to);
	};
	const remove = from => {
		const to = findTarget(from);
		fs.unlinkSync(to);
		options.silent || console.log('[DELETE]', to);
	};
	const rimraf = dir => {
		if (fs.existsSync(dir)) {
			fs.readdirSync(dir).forEach(entry => {
				const entryPath = path.join(dir, entry);
				if (fs.lstatSync(entryPath).isDirectory()) {
					rimraf(entryPath);
				} else {
					fs.unlinkSync(entryPath);
				}
			});
			fs.rmdirSync(dir);
		}
	};

	// clean
	if (options.clean) {
		rimraf(target);
	}

	// initial copy
	if (!options['skip-initial-copy']) {
		sources.forEach(s => glob.sync(s).forEach(copy));
	}

	// watch
	if (options.watch) {
		const chokidarOptions = {
			ignoreInitial: true
		};

		if (options.safe) {
			chokidarOptions.awaitWriteFinish = {
				stabilityThreshold: 500,
				pollInterval: 100
			};
		}

		chokidar
			.watch(sources, chokidarOptions)
			.on('ready', () => sources.forEach(s => {
				options.silent || console.log('[WATCH]', s);
			}))
			.on('add', copy)
			.on('addDir', copy)
			.on('change', copy)
			.on('unlink', remove)
			.on('unlinkDir', remove)
			.on('error', e => console.log('[ERROR]', e));
	}
}

if (require.main === module) {
	copyAndWatchFn(process.argv)
}

exports._ui5mainFn = copyAndWatchFn;