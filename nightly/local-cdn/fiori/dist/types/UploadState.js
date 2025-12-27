/**
 * Different types of UploadState.
 * @public
 */
var UploadState;
(function (UploadState) {
    /**
     * The file has been uploaded successfully.
     * @public
     */
    UploadState["Complete"] = "Complete";
    /**
     * The file cannot be uploaded due to an error.
     * @public
     */
    UploadState["Error"] = "Error";
    /**
     * The file is awaiting an explicit command to start being uploaded.
     * @public
     */
    UploadState["Ready"] = "Ready";
    /**
     * The file is currently being uploaded.
     * @public
     */
    UploadState["Uploading"] = "Uploading";
})(UploadState || (UploadState = {}));
export default UploadState;
//# sourceMappingURL=UploadState.js.map