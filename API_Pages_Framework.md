# Step-by-step framework on Team Balkan Components

Below is the exact framework that we used, to generate API Test Pages of Team Balkan's web components.

## Initial Setup and Prompt

### Initial Setup

 - First we set-up a `components-list.instructions.md` file (we listed in a bulleted list all of the components Claude should iterate);
 - Secondly we created another file with all of the instructions from the ui5-webc-acc-hub (but a little tweaked), in our case it was named `acc-test-page-generation.instructions.md` (included in the Prompt below);

### Initial Prompt

#### We instruct the AI to FIRST generate one-or-two pages, just to make sure we're on the same page.

```prompt
I need you to create a comprehensive API test page for ALL of the components listed in #file:components-list.instructions.md file.

Follow the instructions strictly. Let’s start with the first 2 components. Proceed step-by-step, following the instruction and be concise, DO NOT overengineer.
Use #file:Avatar_ACC_APIs.html and #file:Avatar_ACC_Standards.html files as examples/refferences on how the pages are expected to be. You can also refer to the template provided in the #file:acc-test-page-generation.instructions.md .

Before implementing anything always double-consult with the instruction files. If uncertain for anything, better ask, instead of blindly making decisions. Proceed with the first two components.
```

**Note:** Make sure to actually link the files in the prompt.

After that if the result were good, we instruct the Assistant to continue with the same patterns (we nailed it first try)

```prompt
Perfect! Continue with all of the components listed in the #file:components-list.instructions.md file. The bar and the button are already implemented. As in the previous task, follow the instructions strictly. Proceed step-by-step, following the instructions and be concise, DO NOT overengineer.

Use the #file:Avatar_ACC_APIs.html , #file:Avatar_ACC_Standards.html , #file:Button_APIs.html files as examples, refferences. Refer to the template provided in the #file:acc-test-page-generation.instructions.md file. Before implementing anything, always double-check with the instruction files. if uncertain for ANYTHING ask, instead of blindly making decisions. Proceed with the remaining components.
```

**Note**: Again, make sure to link the files in the prompt manually.

### Avoid hallucinations

A good practice to avoid hallucinations if you have components with large amount of lines, context or else, is to process the components in batches (we did it in batches of 6 to 10), depending on the complexity of the components.

So in short: every 6 to 10 components → New Chat → Prompt including something like:

```prompt
I need you to create a comprehensive API test page for ALL of the REMAINING components listed in #file:components-list.instructions.md file.

Follow the instructions strictly. Proceed step-by-step, following the instruction and be concise, do not overengineer.
Use #file:Bar_APIs.html, #file:Calendar_APIs.html, #file:ColorPalette_APIs.html  and all of the attached files as examples/refferences on how the pages are expected to be. You can also refer to the template provided in the #file:acc-test-page-generation.instructions.md.

Before implementing anything always double-consult with the instruction files. If uncertain for anything, better ask, instead of blindly making decisions. Please proceed with ALL of the remaining components. You can split them in Batches to avoid token and context leakage. MAKE SURE TO NOT INCLUDE ANY DEPRECATED PROPERTIES AND TO INCLUDE ALL OF THE PROPERTIES (EXCEPT THE DEPRECATED ONES) in the test pages.
```

### Error handling

As expected, not everything is always perfect from the first try, so we can encounter some errors, like imports, missing props and so on.

So a good way to handle errors (or at least from my experience) is to use semantic prompts. What I mean by that is structure your prompts, in a semantic way like emphasizing end/start of the error message, giving context or tips what could be the cause of the error, hints and so on. For example:

#### Error 1

Good! Unfortunately in the APIs page of the Date Components we are unable to see anything, and we've got the following error in the console:

```error
LocaleData.ts:98 Uncaught (in promise) Error: CLDR data for locale en is not loaded!
```

#### Error 2

We are still unable to see the components (the calendar). You can check the #file:Calendar.html file for hints, or #file:Calendar.ts for more insights on the CLDR.

```error
LocaleData.ts:98 Uncaught (in promise) Error: CLDR data for locale en is not loaded!
    at getLocaleData (LocaleData.ts:98:9)
    at Object.loadResource (LoaderExtensions.ts:10:9)
    at getOrLoad (LocaleData.js:2520:55)
    at getData (LocaleData.js:2572:13)
    at new constructor (LocaleData.js:57:23)
    at new LocaleData (LocaleData.ts:6:1)
    at getCachedLocaleDataInstance (getCachedLocaleDataInstance.ts:9:21)
    at get _primaryCalendarType (DateComponentBase.ts:129:22)
    at Calendar.getFormat (DateComponentBase.ts:246:24)
    at get _selectedDatesTimestamps (Calendar.ts:355:56)
```

## Manual AXE Testing

After all of the errors are handled, all APIs, samples and whatnot are here and our API Pages look good, we can now proceed to the acc part.

### What we did
  1. We manually traverse through our API pages and check for issues with the AXE tool
  2. All individual issues summarised and structured in Notes, .md file or else
  3. The file we did was structured in format like:

    ```md
    # Accessibility Issues Report

    Files included in the report:

        - Component X;
        - Component Y;
        - Component Z;

        ## Overview
        This document contains accessibility issues found across multiple API documentation pages.

        ## Component X

        ### Issues 1 of N (found with AXE)

        **Element Location:**
        ```code
            #element[class], .class[attr]
        ```

        **Element Code:**
        ```html
            #element[class], .class[attr]
        ```

        **Problems**
            - Element does not have text that is visible to screen readers
            - aria-label attribute does not exist or is empty
            - aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
            - Element has no title attribute

        **To solve this problem, you need to fix at least (1) of the following:**
            - Element does not have text that is visible to screen readers
            - aria-label attribute does not exist or is empty
            - aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
            - Element has no title attribute

        **Issue Details:**
            - **Found:** Automatically
            - **Impact:** serious
            - **Categories:** cat.aria, wcag2a, wcag412, TTv5, TT6.a, EN-301-549, EN-9.4.1.2, ACT
    ```
   4. Then we gave the document to the AI to fix the issues (if they were sample issues)
   5. Most (if not all) of them were component level ACC issues, at least in our case.