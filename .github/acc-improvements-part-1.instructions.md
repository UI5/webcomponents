# Accessibility Issues Report

Files included in the report:

 - CalendarDate_APIs.html
 - Bar_APIs.html
 - Button_APIs.html
 - Calendar_APIs.html
 - SpecialCalendarDate_APIs.html
 - CalendarLegendAPIs.html
 - CalendarDateRange_APIs.html

## Overview
This document contains accessibility issues found across multiple API documentation pages.

---

## CalendarDate_APIs.html

### Issue 1 of 8

**Element Location:**
```
#date-cal,.ui5-calheader-arrowbtn[data-ui5-cal-header-btn-prev="true"][part="calendar-header-arrow-button"]
```

**Element Code:**
```html
<div data-ui5-cal-header-btn-prev="true" class="ui5-calheader-arrowbtn" part="calendar-header-arrow-button" role="button">
  <ui5-icon class="ui5-calheader-arrowicon" ui5-icon="" design="Default" name="slim-arrow-left" mode="Decorative" desktop=""></ui5-icon>
</div>
```

**Problems:**
- Element does not have text that is visible to screen readers
- aria-label attribute does not exist or is empty
- aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
- Element has no title attribute

---

## Bar_APIs.html

**Element Location:**
```
ui5-button[icon="home"][icon-only=""][has-icon=""],button[aria-label=""]
```

**Element Code:**
```html
<button type="button" class="ui5-button-root" data-sap-focus-ref="true" tabindex="0" aria-label="" part="button" role="button">
```

**To solve this problem, you need to fix at least (1) of the following:**
- Element does not have inner text that is visible to screen readers
- aria-label attribute does not exist or is empty
- aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
- Element has no title attribute
- Element does not have an implicit (wrapped) `<label>`
- Element does not have an explicit `<label>`
- Element's default semantics were not overridden with role="none" or role="presentation"

---

## Button_APIs.html

**Status:** ✅ No issues.

---

## Calendar_APIs.html

**Total Serious Issues:** 33

### Issue: Ensure every ARIA button, link and menuitem has an accessible name

[More information - Link opens in a new window]

**Element Location:**
```
#multiple-cal,.ui5-calheader-arrowbtn[data-ui5-cal-header-btn-next="true"][part="calendar-header-arrow-button"]
```

**Element Code:**
```html
<div data-ui5-cal-header-btn-next="true" class="ui5-calheader-arrowbtn" part="calendar-header-arrow-button" role="button">
  <ui5-icon class="ui5-calheader-arrowicon" ui5-icon="" design="Default" name="slim-arrow-right" mode="Decorative" desktop=""></ui5-icon>
</div>
```

**To solve this problem, you need to fix at least (1) of the following:**
- Element does not have text that is visible to screen readers
- aria-label attribute does not exist or is empty
- aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
- Element has no title attribute

**Issue Details:**
- **Found:** Automatically
- **Impact:** serious
- **Categories:** cat.aria, wcag2a, wcag412, TTv5, TT6.a, EN-301-549, EN-9.4.1.2, ACT

---

### Issue: Elements must meet minimum color contrast ratio thresholds

**Description:** Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

[More information - Link opens in a new window]

**Element Location:**
```
#styled-cal,#ui5wc_28-daypicker,.ui5-dp-daytext[data-sap-timestamp="1705276800"]
```

**Element Code:**
```html
<span class="ui5-dp-daytext" data-sap-timestamp="1705276800">15</span>
```

**To solve this problem, you need to fix the following:**
- Element has insufficient color contrast of 1.21 (foreground color: #0064d9, background color: #198754, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1

**Related Node:**
```html
<div tabindex="0" data-sap-focus-ref="true" data-sap-timestamp="1705276800" role="gridcell" title="" aria-selected="true" aria-label="January 15, 2024" aria-disabled="false" class="ui5-dp-item ui5-dp-wday1 ui5-dp-item--selected" part="day-cell day-cell-selected">
```

---

## SpecialCalendarDate_APIs.html

### Issue: Ensure every ARIA button, link and menuitem has an accessible name

[More information - Link opens in a new window]

**Element Location 1 of 12:**
```
.card.border-start.api-section:nth-child(2) > .card-body > .bg-light.rounded.p-3 > .flex-column.d-flex.gap-3 > div > ui5-calendar,.ui5-calheader-arrowbtn[data-ui5-cal-header-btn-prev="true"][part="calendar-header-arrow-button"]
```

**Element Code:**
```html
<div data-ui5-cal-header-btn-prev="true" class="ui5-calheader-arrowbtn" part="calendar-header-arrow-button" role="button">
  <ui5-icon class="ui5-calheader-arrowicon" ui5-icon="" design="Default" name="slim-arrow-left" mode="Decorative" desktop=""></ui5-icon>
</div>
```

**To solve this problem, you need to fix at least (1) of the following:**
- Element does not have text that is visible to screen readers
- aria-label attribute does not exist or is empty
- aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
- Element has no title attribute

**Issue Details:**
- **Found:** Automatically
- **Impact:** serious
- **Categories:** cat.aria, wcag2a, wcag412, TTv5, TT6.a, EN-301-549, EN-9.4.1.2, ACT

---

## CalendarLegendAPIs.html

### Issue: Ensure every ARIA button, link and menuitem has an accessible name

[More information - Link opens in a new window]

**Element Location:**
```
.card.border-start.api-section:nth-child(9) > .card-body > .bg-light.rounded.p-3 > .flex-wrap.d-flex.gap-3 > div > ui5-calendar,.ui5-calheader-arrowbtn[data-ui5-cal-header-btn-next="true"][part="calendar-header-arrow-button"]
```

**Element Code:**
```html
<div data-ui5-cal-header-btn-next="true" class="ui5-calheader-arrowbtn" part="calendar-header-arrow-button" role="button">
  <ui5-icon class="ui5-calheader-arrowicon" ui5-icon="" design="Default" name="slim-arrow-right" mode="Decorative" desktop=""></ui5-icon>
</div>
```

**To solve this problem, you need to fix at least (1) of the following:**
- Element does not have text that is visible to screen readers
- aria-label attribute does not exist or is empty
- aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
- Element has no title attribute

**Issue Details:**
- **Found:** Automatically
- **Impact:** serious
- **Categories:** cat.aria, wcag2a, wcag412, TTv5, TT6.a, EN-301-549, EN-9.4.1.2, ACT
- **Found on:** 04/11/2025 at 2:26 PM

---

## CalendarDateRange_APIs.html

### Issue: Ensure every ARIA button, link and menuitem has an accessible name

[More information - Link opens in a new window]

**Element Location:**
```
ui5-calendar[_header-month-button-text="May"],.ui5-calheader-arrowbtn[data-ui5-cal-header-btn-next="true"][part="calendar-header-arrow-button"]
```

**Element Code:**
```html
<div data-ui5-cal-header-btn-next="true" class="ui5-calheader-arrowbtn" part="calendar-header-arrow-button" role="button">
  <ui5-icon class="ui5-calheader-arrowicon" ui5-icon="" design="Default" name="slim-arrow-right" mode="Decorative" desktop=""></ui5-icon>
</div>
```

**To solve this problem, you need to fix at least (1) of the following:**
- Element does not have text that is visible to screen readers
- aria-label attribute does not exist or is empty
- aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
- Element has no title attribute

**Issue Details:**
- **Found:** Automatically
- **Impact:** serious
- **Categories:** cat.aria, wcag2a, wcag412, TTv5, TT6.a, EN-301-549, EN-9.4.1.2, ACT
- **Found on:** 04/11/2025 at 2:28 PM