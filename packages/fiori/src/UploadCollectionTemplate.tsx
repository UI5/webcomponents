import List from "@ui5/webcomponents/dist/List.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import uploadToCloud from "@ui5/webcomponents-icons/dist/upload-to-cloud.js";
import IllustratedMessage from "./IllustratedMessage.js";
import type UploadCollection from "./UploadCollection.js";
import UploadCollectionDnDOverlayMode from "./types/UploadCollectionDnDMode.js";

export default function UploadCollectionTemplate(this: UploadCollection) {
	return (
		<div
			role="region"
			class="ui5-uc-root"
			aria-roledescription={this._roleDescription}
			onDrop={this._ondrop}
			onui5-request-delete={this._onItemDelete}
		>
			<div class={{
				"ui5-uc-content": true,
				"ui5-uc-content-no-data": this.items.length === 0
			}}>
				<List
					accessibleName={this.accessibleName}
					selectionMode={this.selectionMode}
					onSelectionChange={this._onSelectionChange}
				>
					<slot slot="header" name="header"></slot>
					<slot></slot>
					{this._showNoData &&
						<ListItemCustom
							class={{
								"uc-no-files": true,
								"uc-no-files-dnd-overlay": this._showDndOverlay,
							}}
							type="Inactive"
						>
							<IllustratedMessage	name="Tent">
								<Title slot="title" wrappingType="None" level={this.noDataHeaderLevel}>{this._noDataText}</Title>
								<span slot="subtitle">{this._noDataDescription}</span>
							</IllustratedMessage>
						</ListItemCustom>
					}
				</List>

				{this._showDndOverlay &&
					<div
						class={{
							"uc-dnd-overlay": true,
							"uc-drag-overlay": this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drag,
							"uc-drop-overlay": this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drop,
						}}
						onDragEnter={this._ondragenter}
						onDragLeave={this._ondragleave}
						onDragOver={this._ondragover}
					>
						<Icon name={uploadToCloud}/>
						<span class="dnd-overlay-text">{this._dndOverlayText}</span>
					</div>
				}
			</div>
		</div>);
}
