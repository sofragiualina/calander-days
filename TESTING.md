# Testing Documentation

## 1. Unit Tests

**Requirement:** At least one non-trivial unit test must test code used by the project.

**How tested:** Unit tests in `common.test.mjs`.

Run:

```bash
npm test
```

The tests check:

- The second Tuesday of October 2026 is 13 October.
- The last Friday of October 2026 is 30 October.
- February 1900 ends on 28 February.
- The fifth Thursday of February 2024 is 29 February.
- The second Tuesday of October 2030 is 8 October.
- The function returns `null` when the fifth Monday of February 2026 does not exist.

**Status:** Implemented. All six unit tests passed.

## 2. Calendar Display

**Requirement:** The website displays the current month when loaded, with each day shown in a dynamically generated calendar.

**How tested:** Open the website and check that the displayed month and year match the current date. Confirm that every day of the month is displayed.

**Status:** Implemented. Manual verification documented.

## 3. Calendar Layout

**Requirement:** The calendar displays weeks in seven columns, starting on Sunday, with the correct number of rows and no unnecessary days from other months.

**How tested:** Open October 2024 and verify that the calendar has five rows and seven columns. Check that the first date is Tuesday 1 October and the last date is Thursday 31 October. Sunday and Monday before the first day, and Friday and Saturday after the last day, may be blank.

Also verify these months:

- December 2024: Sunday 1 December to Tuesday 31 December.
- February 2025: Saturday 1 February to Friday 28 February.
- May 2025: Thursday 1 May to Saturday 31 May.
- February 2026: Sunday 1 February to Saturday 28 February.

**Status:** Layout test cases documented.

## 4. Previous and Next Month Navigation

**Requirement:** The previous and next buttons change the displayed month by one month per click and continue working across year boundaries.

**How tested:** Click Next Month from December and confirm that January of the following year appears. Click Previous Month from January and confirm that December of the previous year appears. Repeat the actions several times and verify the displayed month and year.

**Status:** Navigation test cases documented.

## 5. Month and Year Selection

**Requirement:** Users can jump directly to a selected month and year.

**How tested:** Select October 2024 and verify the displayed month and commemorative days. Repeat with May 2030 and February 2026. Check that the previous and next buttons continue to work after changing the selected month and year.

**Status:** Month and year selection test cases documented.

## 6. Commemorative Day Calculations

**Requirement:** Commemorative days are calculated dynamically from `days.json` and display on the correct dates for any year.

**How tested:** Check the following examples in the website:

- October 2024: Ada Lovelace Day on 8 October and World Lemur Day on 25 October.
- October 2020: Ada Lovelace Day on 13 October and World Lemur Day on 30 October.
- May 2030: International Binturong Day on 11 May.

Check additional years to confirm that dates are calculated from the patterns in `days.json`, rather than hard-coded.

**Status:** Date-calculation unit tests passed. Website test cases documented.

## 7. Dynamic Data

**Requirement:** The calendar must continue working when commemorative days are added to or removed from `days.json`, without requiring hard-coded logic for individual days.

**How tested:** Review the implementation to confirm that it reads the JSON data and uses `calculateDayDate()` to calculate each event date. If practical, test with a temporary additional event and verify that it appears on the expected date.

**Status:** Dynamic-data test procedure documented.

## 8. iCalendar Generation

**Requirement:** For a team of at least two, a Node.js script generates `days.ics` with one whole-day event for each commemorative day and year from 2020 to 2030 inclusive.

**How tested:** Run:

```bash
npm run generate-ical
```

Check the number of generated events:

```bash
grep -c "BEGIN:VEVENT" days.ics
grep -c "DTSTART;VALUE=DATE" days.ics
```

With the current five entries in `days.json`, both commands return `55`.

Inspect the generated file to confirm that events have `SUMMARY` and `DTSTART;VALUE=DATE` fields and do not contain `DTEND` or timed start fields.

**Status:** Implemented and tested. The generator created 55 events, and both event-count checks returned 55.

## 9. Shared Date-Calculation Logic

**Requirement:** The website and the iCal generator must use the same date-calculation logic.

**How tested:** Inspect `web.mjs` and `generate-ical.mjs` to confirm that both import `calculateDayDate()` from `common.mjs`.

**Status:** Shared date-calculation logic implemented.

## 10. Google Calendar Import

**Requirement:** The generated iCalendar file must import into Google Calendar with the correct dates and whole-day events.

**How tested:** Import `days.ics` into a new test calendar in Google Calendar. Compare the displayed dates against the website for the dates listed in the project requirements. Confirm that events are whole-day events.

**Status:** Import test procedure documented.

## 11. Accessibility

**Requirement:** Every view of the website must achieve 100% accessibility in Lighthouse Desktop mode.

**How tested:** Open the deployed website, launch Chrome DevTools, select Lighthouse, choose Desktop and Accessibility, and generate a report. Repeat for multiple months, including February 2026 and months containing commemorative days. Verify that the Accessibility score is 100%.

Also check keyboard navigation, visible focus indicators, form labels, readable event text, and accessible date information.

**Status:** Accessibility test procedure documented.

## 12. Responsive Layout

**Requirement:** The calendar should remain usable at different screen sizes.

**How tested:** Open the website at desktop and mobile viewport sizes. Check that all seven weekday columns remain visible, the controls can be used, and event names do not overflow their cells.

**Status:** Responsive-layout test procedure documented.

## 13. Code Quality

**Requirement:** All JavaScript and CSS must be used, with no dead code. Code must be correctly indented and understandable.

**How tested:** Review the source files and remove unused functions, imports, variables, styles, and placeholder comments. Run the unit tests after changes.

**Status:** Code-review checklist documented.

## 14. Deployment

**Requirement:** The website must be hosted on the internet and automatically deployed when changes are merged into the GitHub repository.

**How tested:** Open the deployed website. Merge a test change through the project's normal workflow and verify that deployment completes and the updated website is available.

**Status:** Deployment test procedure documented.
