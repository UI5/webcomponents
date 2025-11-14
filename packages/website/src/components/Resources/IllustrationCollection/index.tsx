import React, { useEffect } from 'react';
import '@ui5/webcomponents/dist/Icon.js'
import '@ui5/webcomponents/dist/Button.js'
import '@ui5/webcomponents/dist/Input.js'
import '@ui5/webcomponents/dist/Text.js'
import '@ui5/webcomponents/dist/Bar.js'
import '@ui5/webcomponents/dist/Panel.js'
import '@ui5/webcomponents/dist/Select.js'
import '@ui5/webcomponents/dist/Option.js'
import '@ui5/webcomponents/dist/Title.js'
import '@ui5/webcomponents-icons/dist/decline.js'
import '@ui5/webcomponents-fiori/dist/IllustratedMessage.js'
import '@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js'
import ResourcesLayout from '@site/src/components/Resources/ResourcesLayout';
import SidePanel from '@site/src/components/Resources/SidePanel';

import './styles.css';


// @ts-ignore
export default function FriendsComponent({ collectioName, illustrationTypes, illustrationDesign }) {
	const [filterValue, setFilterValue] = React.useState('');
	const [selectedDesign, setSelectedDesign] = React.useState('Large');
	const [selectedIllustration, setSelectedIllustration] = React.useState(null);
	const elRef = React.useRef<HTMLElement | null>(null);

	const handleFilterChange = (event: CustomEvent) => {
		const input = event.target as HTMLInputElement;
		setFilterValue(input.value);
	}

	React.useEffect(() => {
		const el = elRef.current;
		if (!el) return;

		const handleSelectionChange = (event: CustomEvent) => {
			const select = event.target as HTMLSelectElement;
			setSelectedDesign(select.value);
		}

		el.addEventListener("ui5-change", handleSelectionChange);

		return () => {
			el.removeEventListener("ui5-change", handleSelectionChange);
		};
	}, []);

	const handleClose = () => {
		setSelectedIllustration(null);
	}


	return <ResourcesLayout>
		<div className='illustration-collection-header'>
			<ui5-title level='H1' size='H1' wrapping-type='None' class='illustration-collection-header--title'>{collectioName}</ui5-title>
			<ui5-select value={selectedDesign} ref={elRef} class='illustration-collection-header--filter'>
				{
					illustrationDesign.filter(design => !design.deprecated && design.name !== 'Auto' && design.name !== 'Base').map(design => (
						<ui5-option key={design.name} value={design.name}>{design.name}</ui5-option>
					))
				}
			</ui5-select>
			<ui5-input placeholder='Filter illustrations...' class='illustration-collection-header--filter' onInput={handleFilterChange} />
		</div>
		<div className='illustration-collection-list'>
			{
				illustrationTypes.filter(illustration => illustration.name.includes(filterValue)).map((illustration) => (
					<div key={`${illustration.collection}/${illustration.name}`}
						onClick={() => {
							setSelectedIllustration(illustration.name);
						}}
						className='illustration-collection-list-item'>
						<ui5-illustrated-message name={illustration.name} design={selectedDesign}>
							<ui5-title slot='title' class='illustration-collection-list-item--title'>{illustration.name}</ui5-title>
							<ui5-text slot='subtitle'>{selectedDesign}</ui5-text>
						</ui5-illustrated-message>
					</div>
				))
			}
		</div>

		{!!selectedIllustration &&
			<SidePanel open={true}>
				<ui5-page>
					<ui5-bar slot='header'>
						<ui5-title slot='startContent'>Illustration: {selectedIllustration}</ui5-title>
						<ui5-button slot='endContent' icon='decline' design='Transparent' onClick={handleClose}></ui5-button>
					</ui5-bar>

					<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBlock: '1rem' }}>
						<ui5-panel fixed expanded header-text={`Illustration design: ExtraSmall`}>
							<ui5-illustrated-message name={selectedIllustration} design='ExtraSmall'></ui5-illustrated-message>
						</ui5-panel>

						<ui5-panel fixed expanded header-text={`Illustration design: Small`}>
							<ui5-illustrated-message name={selectedIllustration} design='Small'></ui5-illustrated-message>
						</ui5-panel>

						<ui5-panel fixed expanded header-text={`Illustration design: Medium`}>
							<ui5-illustrated-message name={selectedIllustration} design='Medium'></ui5-illustrated-message>
						</ui5-panel>
						<ui5-panel fixed expanded header-text={`Illustration design: Large`}>
							<ui5-illustrated-message name={selectedIllustration} design='Large'></ui5-illustrated-message>
						</ui5-panel>
					</div>
				</ui5-page>
			</SidePanel>
		}
	</ResourcesLayout >
}