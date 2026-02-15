/**
 * Different types of UploadState.
 * @public
 */
declare enum UploadState {
    /**
     * The file has been uploaded successfully.
     * @public
     */
    Complete = "Complete",
    /**
     * The file cannot be uploaded due to an error.
     * @public
     */
    Error = "Error",
    /**
     * The file is awaiting an explicit command to start being uploaded.
     * @public
     */
    Ready = "Ready",
    /**
     * The file is currently being uploaded.
     * @public
     */
    Uploading = "Uploading"
}
export default UploadState;
