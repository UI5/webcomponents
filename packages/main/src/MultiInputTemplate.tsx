import Icon from "./Icon.js";
import InputTemplate from "./InputTemplate.js";
import type MultiInput from "./MultiInput.js";
import type { MultiInputTokenDeleteEventDetail } from "./MultiInput.js";
import Tokenizer from "./Tokenizer.js";
import ToggleButton from "./ToggleButton.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import ListAccessibleRole from "./types/ListAccessibleRole.js";
import valueHelp from "@ui5/webcomponents-icons/dist/value-help.js";

export default function MultiInputTemplate(this: MultiInput) {
	return [
		InputTemplate.call(this, {
			preContent,
			postContent,
			suggestionsList: multiInputSuggestionsList,
			mobileHeader: multiInputMobileHeader,
		}),
	];
}

function preContent(this: MultiInput) {
	return (
		<>
			<span id="hiddenText-nMore" class="ui5-hidden-text">{this._tokensCountText}</span>

			{this.showValueHelpIcon &&
				<span id="hiddenText-value-help" class="ui5-hidden-text">{this._valueHelpText}</span>
			}
			<Tokenizer
				class="ui5-multi-input-tokenizer"
				opener={this.morePopoverOpener}
				popoverMinWidth={this._inputWidth}
				hidePopoverArrow={true}
				expanded={this.tokenizerExpanded}
				onKeyDown={this._onTokenizerKeydown}
				onTokenDelete={this.tokenDelete}
				onFocusOut={this._tokenizerFocusOut}
				onShowMoreItemsPress={this._showMoreItemsPress}
			>
				{ this.tokens.map(token => <slot name={token._individualSlot}></slot>)}
			</Tokenizer>
		</>
	);
}

function postContent(this: MultiInput) {
	return (
		<>
			{this.showValueHelpIcon &&
				<Icon
					class="inputIcon"
					name={valueHelp}
					accessibleName={this.valueHelpLabel}
					onMouseUp={this.valueHelpMouseUp}
					onMouseDown={this.valueHelpMouseDown}
					onClick={this.valueHelpPress}
				/>
			}
		</>
	);
}

function multiInputSuggestionsList(this: MultiInput) {
	if (this._effectiveShowTokensInSuggestions) {
		return (
			<List
				class="ui5-tokenizer-list"
				accessibleRole={ListAccessibleRole.ListBox}
				separators={this.suggestionSeparators}
				selectionMode="Delete"
				onMouseDown={this.onItemMouseDown}
				onItemClick={this._handleSuggestionItemPress}
				onSelectionChange={this._handleSelectionChange}
				onItemDelete={(e: any) => {
					const listItem = e.detail.item;
					const tokenId = listItem.getAttribute("data-ui5-token-ref-id");
					const token = this.tokens.find((t: any) => t._id === tokenId);

					if (token) {
						this.tokenDelete({ detail: { tokens: [token] } } as CustomEvent<MultiInputTokenDeleteEventDetail>);
					}
				}}
			>
				{this.tokens?.map((token: any, index: number) => (
					<ListItemStandard
						key={index}
						class="ui5-suggestion-token-item"
						data-ui5-token-ref-id={token._id}
						wrappingType="Normal"
						text={token.text}
					/>
				))}
			</List>
		);
	}

	return (
		<List
			accessibleRole={ListAccessibleRole.ListBox}
			separators={this.suggestionSeparators}
			selectionMode="Single"
			onMouseDown={this.onItemMouseDown}
			onItemClick={this._handleSuggestionItemPress}
			onSelectionChange={this._handleSelectionChange}
		>
			<slot></slot>
		</List>
	);
}

function multiInputMobileHeader(this: MultiInput) {
	return (
		<ToggleButton
			class="ui5-multi-input-mobile-dialog-button"
			design="Transparent"
			icon="multiselect-all"
			accessibleName="Show selected tokens"
			disabled={!this.tokens?.length}
			pressed={this._effectiveShowTokensInSuggestions}
			onClick={() => {
				this._userToggledShowTokens = true;
				this._showTokensInSuggestions = !this._effectiveShowTokensInSuggestions;
			}}
		/>
	);
}
