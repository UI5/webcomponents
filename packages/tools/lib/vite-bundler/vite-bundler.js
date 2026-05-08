import { build } from 'vite';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { pathToFileURL } from "url";

async function start(outArgv) {
    const argv = yargs(hideBin(outArgv))
        .alias("c", "config")
        .alias("mode", "mode")
        .alias("base", "base")
        .argv;

    try {
        await build({
            configFile: argv.config || undefined,
            mode: argv.mode || undefined,
            base: argv.base || undefined,
            logLevel: 'info',
        });
    } catch (e) {
        console.error(e)
        process.exit(1);
    }
};

const filePath = process.argv[1];
const fileUrl = pathToFileURL(filePath).href;

if (import.meta.url === fileUrl) {
    start(process.argv)
}

export default {
    _ui5mainFn: start
}