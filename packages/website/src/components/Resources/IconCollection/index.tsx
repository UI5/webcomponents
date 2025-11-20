import React from 'react';
import "@ui5/webcomponents/dist/Icon.js"
import "@ui5/webcomponents/dist/Button.js"
import "@ui5/webcomponents/dist/Input.js"
import "@ui5/webcomponents/dist/Text.js"
import "@ui5/webcomponents/dist/Title.js"
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";
import "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";
import ResourceLayout from '@site/src/components/Resources/ResourcesLayout';

import "./styles.css";


// @ts-ignore
export default function FriendsComponent({ collectioName, icons }) {
	const [filterValue, setFilterValue] = React.useState("");

	const handleFilterChange = (event: CustomEvent) => {
		const input = event.target as HTMLInputElement;
		setFilterValue(input.value);
	}
	return <ResourceLayout>
		<div className='icon-collection-header'>
			<ui5-title level="H1" size="H1" wrapping-type="None" class="icon-collection-header--title">{collectioName}</ui5-title>
			<ui5-input placeholder="Filter icons..." class="icon-collection-header--filter" onInput={handleFilterChange} />
		</div>
		<div className="icon-collection-list">
			{
				icons.filter(iconData => iconData.name.includes(filterValue)).map((iconData) => (
					<div key={`${iconData.collection}/${iconData.name}`} className="icon-collection-list-item">
						<ui5-icon name={`${iconData.collection}/${iconData.name}`} class="icon-collection-list-item--icon"></ui5-icon>
						<ui5-text class="icon-collection-list-item--title">
							{iconData.name}
						</ui5-text>
						<div className='icon-collection-list-item--actions'>
							<ui5-button design="Transparent" icon="copy"></ui5-button>
							<ui5-button design="Transparent" icon="picture"></ui5-button>
						</div>
					</div>
				))
			}
		</div>
	</ResourceLayout>
}