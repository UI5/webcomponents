import Title from "@ui5/webcomponents/dist/Title.js";
import type SearchMessageArea from "./SearchMessageArea.js";
import TitleLevel from "@ui5/webcomponents/dist/types/TitleLevel.js";
import Text from "@ui5/webcomponents/dist/Text.js";

export default function SearchMessageAreaTemplate(this: SearchMessageArea) {
	return (
		<>
			<div class="ui5-search-message-area-wrapper">
				<Title size={TitleLevel.H6}>{this.text}</Title>
				<Text class="ui5-search-message-area-description">{this.description}</Text>
			</div>
		</>
	);
}
