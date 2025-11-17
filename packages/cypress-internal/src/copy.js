import { copyFile, mkdir } from "fs/promises";
import path from "path";

const dirname = import.meta.dirname;
const eslintInputPath = path.join(dirname, "./eslint.cjs");
const eslintOutputPath = path.join(dirname, "../dist/eslint.cjs");

await mkdir(path.dirname(eslintOutputPath), {recursive: true});
await copyFile(eslintInputPath, eslintOutputPath)
console.log("eslint.cjs copied successfully")