## API Test Page Generation Guidelines

I need you to create a comprehensive API test page for the provided components.

Each component has the following relevant files in its directory main/fiori:
- [COMPONENT_NAME].ts - Component logic and properties
- [COMPONENT_NAME]Template.tsx - Component structure and markup; Traverse this file to understand how the component is built, and if available find the sub-templates and index them as well, e.g. ColorPaletterteTemplate.tsx and ColorPaletteItemTemplate.tsx;
- [COMPONENT_NAME].html - Component html structure reference
- [COMPONENT_NAME].css - Component styles
- APIs_Template.html - For styling and structure reference

Task Requirements:

1. API Analysis & Documentation
   - Analyze all API's of the component, and generate separate examples for each one of them
   - Document ARIA attributes, and roles only for the accessibility related API's
   - Identify keyboard navigation patterns and focus management
   - Analyze component-specific interactions
   - Do NOT use any deprecated API's
   - For specific features or functionalities such as F6 Navigation, localization, theming, etc., ensure to include relevant imports
   - Ensure all necessary assets are imported for proper component rendering and functionality

2. Test Page Structure
   - Follow strictly the styling and structure of APIs_Template.html, do not change any styling and do not add any from your side to the structure, replace whats instructed there
   - Create clear section headers with consistent card-based formatting
   - Use [COMPONENT_NAME].html only as a reference to understand how the component is used, do not copy or replicate code from it
   - Create fresh, original examples based on the component's APIs
   - Do not use <kbd>, <code>, or any other semantic or inline tags for keyboard keys, code, or emphasis

3. Test Implementation
   - Generate working component examples for each API
   - Include interactive demonstrations of ARIA attributes and roles
   - Add keyboard navigation testing scenarios
   - Provide screen reader compatibility examples
   - Include test instructions only for interactive demonstrations that require user action to see the API working
   - Create the file in acc-tests/packages/main/test/pages directory, NOT in the submodule
   - File name: [COMPONENT_NAME]_APIs.html

## APIs_Template.html File Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>UI5 [COMPONENT_NAME] API Samples</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- DO NOT change, use as it is-->
    <script type="importmap">
      {
        "imports": {"@ui5/webcomponents/":"https://cdn.jsdelivr.net/npm/@ui5/webcomponents@2.15.0-rc.0/","@ui5/webcomponents-ai/":"https://cdn.jsdelivr.net/npm/@ui5/webcomponents-ai@2.15.0-rc.0/","@ui5/webcomponents-fiori/":"https://cdn.jsdelivr.net/npm/@ui5/webcomponents-fiori@2.15.0-rc.0/","@ui5/webcomponents-compat/":"https://cdn.jsdelivr.net/npm/@ui5/webcomponents-compat@2.15.0-rc.0/","@ui5/webcomponents-base/jsx-runtime":"https://cdn.jsdelivr.net/npm/@ui5/webcomponents-base@2.15.0-rc.0/dist/jsx-runtime.js","@ui5/webcomponents-base/":"https://cdn.jsdelivr.net/npm/@ui5/webcomponents-base@2.15.0-rc.0/","@ui5/webcomponents-icons/":"https://cdn.jsdelivr.net/npm/@ui5/webcomponents-icons@2.15.0-rc.0/","@ui5/webcomponents-localization/":"https://cdn.jsdelivr.net/npm/@ui5/webcomponents-localization@2.15.0-rc.0/","@ui5/webcomponents-theming/":"https://cdn.jsdelivr.net/npm/@ui5/webcomponents-theming@2.15.0-rc.0/","lit-html":"https://cdn.jsdelivr.net/npm/lit-html@2","lit-html/":"https://cdn.jsdelivr.net/npm/lit-html@2/","@zxing/library/":"https://cdn.jsdelivr.net/npm/@zxing/library@0/"}
      }
    </script>
    
    <script type="module">
        // [AI_REPLACE_START: Component Imports]
        // [AI_REPLACE_END]
    </script>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    
    <!-- Custom CSS for API-specific styling -->
    <style>
        .api-section {
            border-left-width: 3px;
        }
        
        .api-section.blue-accent {
            border-left-color: #0d6efd;
        }
        
        .test-instruction {
            font-size: 0.75rem;
            color: darkred;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <main role="main" aria-label="[COMPONENT_NAME] API test samples">
        <div class="container-fluid py-4">
            <h1 class="display-5 text-dark mb-4">UI5 [COMPONENT_NAME] Component API Samples</h1>

            <!-- [AI_REPLACE_START: API Cards] -->
            <!-- Create one card for each API element (property, slot, event, method) from the component -->
            <!-- Each card follows this exact structure: -->
            
            <div class="card border-start api-section blue-accent mb-4">
                <div class="card-body">
                    <h2 class="h6 fw-bold mb-3">[API_NAME] API</h2>
                    <div class="text-muted fst-italic mb-3">[Description of what this API does]</div>
                    <div class="bg-light rounded p-3">
                        <div class="d-flex flex-wrap gap-3 align-items-center" data-cy-acc-container-id="[32_char_hex_id]">
                            <!-- Add component examples here demonstrating the API -->
                        </div>
                        <!-- Optional: Add test-instruction div only if manual testing is needed -->
                        <!-- <div class="test-instruction">Test instructions: [How to test]</div> -->
                    </div>
                </div>
            </div>
            
            <!-- [AI_REPLACE_END] -->
        </div>
    </main>

    <!-- [AI_REPLACE_START: JavaScript] -->
    <!-- Add JavaScript only if needed for interactive demos (events, accessibilityAttributes, etc.) -->
    <script>
        // Example: Event listeners, accessibilityAttributes setup
    </script>
    <!-- [AI_REPLACE_END] -->
    
    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```