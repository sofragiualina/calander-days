# Testing Documentation

## 1. Unit Tests

Unit tests are in `common.test.mjs`.

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

**Status:** All six unit tests passed.

## 2. Calendar Display and Layout

**How tested:**

- Open the website and check that the displayed month and year match the current date.
- Check that every day of the month is displayed.
- Open October 2024 and verify that the calendar has five rows and seven columns.
- Confirm that 1 October is Tuesday and 31 October is Thursday.
- Check that blank cells appear before and after the dates where needed.
- Check the following months:
  - December 2024: 1 December is Sunday and 31 December is Tuesday.
  - February 2025: 1 February is Saturday and 28 February is Friday.
  - May 2025: 1 May is Thursday and 31 May is Saturday.
  - February 2026: 1 February is Sunday and 28 February is Saturday.

## 3. Month Navigation and Selection

**How tested:**

- Click Next Month and Previous Month and check that the displayed month changes correctly.
- Navigate from December to January and confirm that the year increases.
- Navigate from January to December and confirm that the year decreases.
- Repeat the navigation several times.
- Select October 2024, May 2030, and February 2026 using the month and year controls.
- Check that the correct month, year, and commemorative days are displayed after each selection.
- Check that the navigation buttons still work after selecting a different month and year.

## 4. Commemorative Day Calculations

**How tested:**

- Open October 2024 and check that Ada Lovelace Day appears on 8 October and World Lemur Day on 25 October.
- Open October 2020 and check that Ada Lovelace Day appears on 13 October and World Lemur Day on 30 October.
- Open May 2030 and check that International Binturong Day appears on 11 May.
- Check additional years to confirm that commemorative dates change according to their patterns in `days.json`.

## 5. Dynamic Data

**How tested:**

- Review the code to confirm that commemorative days are loaded from `days.json`.
- Check that `calculateDayDate()` is used to calculate the event dates.
- If practical, temporarily add an event to `days.json`, reload the website, and verify that it appears on the expected date.
- Remove the temporary event after testing.

## 6. iCalendar Generation

Created `generate-ical.mjs` to generate `days.ics` for 2020–2030 inclusive.

Run:

```bash
npm run generate-ical
```

Checked the generated events using:

```bash
grep -c "BEGIN:VEVENT" days.ics
grep -c "DTSTART;VALUE=DATE" days.ics
```

Both commands returned `55`.

**Additional checks:**

- Confirm that each event contains a `SUMMARY` field.
- Confirm that each event contains a `DTSTART;VALUE=DATE` field.
- Check that the file does not contain `DTEND` or timed start fields.
- Inspect sample events and compare their dates with the website.

**Status:** The generator created 55 events, and both event-count checks returned 55.

## 7. Shared Date-Calculation Logic

**How tested:**

- Check `web.mjs` and `generate-ical.mjs`.
- Confirm that both import `calculateDayDate()` from `common.mjs`.

## 8. Google Calendar Import

**How tested:**

- Generate `days.ics` using `npm run generate-ical`.
- Open Google Calendar.
- Create a separate test calendar.
- Import `days.ics` into the test calendar.
- Check that the events appear on the correct dates.
- Compare selected imported events with the website.
- Confirm that the imported events are whole-day events.

## 9. Accessibility

**How tested:**

- Open the deployed website in Chrome.
- Open Chrome DevTools and select Lighthouse.
- Choose Desktop and Accessibility, then generate a report.
- Check whether the Accessibility score is 100%.
- Repeat for February 2026 and months containing commemorative days.
- Use the keyboard to navigate through the controls.
- Check that focus indicators are visible.
- Check that form controls have accessible labels.
- Check that event text is readable and date information is understandable.

## 10. Responsive Layout

**How tested:**

- Open the website at desktop and mobile viewport sizes.
- Check that all seven weekday columns remain visible.
- Check that the month and year controls and navigation buttons can be used.
- Check that event names do not overflow their cells.
- Confirm that the calendar remains readable at different screen sizes.

## 11. Code Quality

**How tested:**

- Review the JavaScript and CSS files.
- Check for unused functions, imports, variables, and styles.
- Remove unnecessary placeholder comments and dead code.
- Check indentation and code readability.
- Run `npm test` after making changes.

## 12. Deployment

**How tested:**

- Open the deployed website and check that it loads correctly.
- Test the calendar display, navigation, and commemorative dates on the deployed version.
- Check the repository's deployment workflow.
- After merging a change, verify that deployment completes and the updated website is available.
