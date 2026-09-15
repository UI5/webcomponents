/**
 * ""                        -> ""
 * "noExtension"             -> ""
 * "file.txt"                -> ".txt"
 * "file.with.many.dots.doc" -> ".doc"
 * ".gitignore"              -> ""
 *
 * @param { string } fileName - the file name
 * @returns { string }
 */
declare const getFileExtension: (fileName: string) => string;
export default getFileExtension;
