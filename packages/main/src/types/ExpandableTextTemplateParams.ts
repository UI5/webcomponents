/**
 * Interface defining the parameters for the ExpandableText template
 */
export interface ExpandableTextTemplateParams {
	/** CSS class name to be applied to the ExpandableText */
	className: string;
	/** Text content to be displayed */
	text: string;
	/** Maximum number of characters before truncation */
	maxCharacters: number;
	/** Optional CSS part name */
	part?: string;
}
