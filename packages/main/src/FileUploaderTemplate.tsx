import Icon from "./Icon.js";
import browseIcon from "@ui5/webcomponents-icons/dist/browse-folder.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import Tokenizer from "./Tokenizer.js";
import Token from "./Token.js";
import type FileUploader from "./FileUploader.js";
import FileUploaderPopoverTemplate from "./FileUploaderPopoverTemplate.js";

export default function FileUploaderTemplate(this: FileUploader) {
	return (
		<>
			<div
				class="ui5-file-uploader-root"
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				onKeyDown={this._onkeydown}
				onKeyUp={this._onkeyup}
				onClick={this._onclick}
				onMouseDown={this._onmousedown}
				onDragOver={this._ondrag}
				onDrop={this._ondrop}
			>
				<div class="ui5-file-uploader-form">
					<input
						type="file"
						class="ui5-file-uploader-native-input"
						name={this.name}
						multiple={this.multiple}
						accept={this.accept}
						disabled={this.disabled}
						title={this.inputTitle}
						aria-roledescription={this.accInfo.ariaRoledescription}
						aria-haspopup={this.accInfo.ariaHasPopup}
						aria-label={this.accInfo.ariaLabel}
						aria-description={this.accInfo.ariaDescription}
						aria-required={this.accInfo.ariaRequired}
						aria-invalid={this.accInfo.ariaInvalid}
						onClick={this._onNativeInputClick}
						onChange={this._onChange}
						data-sap-focus-ref
					/>
				</div>

				{this.hideInput ? (
					<slot></slot>
				) : (
					<div class="ui5-file-uploader-display-container">
						<div class="ui5-file-uploader-display-elements">
							{this._selectedFilesNames.length > 0 ? (
								<>
									<Tokenizer
										class="ui5-file-uploader-tokenizer"
										expanded={this._tokenizerExpanded}
										open={this._tokenizerOpen}
										popoverMinWidth={this._formWidth}
										onClick={this._onTokenizerClick}
										onMouseDown={this._onTokenizerMouseDown}
										onKeyDown={this._onTokenizerKeyDown}
										onKeyUp={this._onTokenizerKeyUp}
										preventInitialFocus
										readonly
									>
										{this._selectedFilesNames.map(fileName => (
											<Token
												text={fileName}
											/>
										))}
									</Tokenizer>
									<Icon
										name={decline}
										class="ui5-file-uploader-clear-icon inputIcon"
										onClick={this._onClearIconClick}
										title={this.clearIconTitle}
									/>
								</>
							) : (
								<input
									class="ui5-file-uploader-display-input"
									tabindex={-1}
									aria-hidden="true"
									title={this.inputTitle}
									placeholder={this.resolvedPlaceholder}
									inner-input
									readonly
								/>
							)}

							<Icon
								name={browseIcon}
								class="ui5-file-uploader-value-help-icon inputIcon"
								title={this.valueHelpTitle}
							/>
						</div>

						<slot></slot>
					</div>
				)}
			</div>

			{ FileUploaderPopoverTemplate.call(this) }
		</>
	);
}
