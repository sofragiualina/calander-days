// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import { readFile, writeFile } from "node:fs/promises";
import { calculateDayDate } from "./common.mjs";

const START_YEAR = 2020;
const END_YEAR = 2030;

const daysData = JSON.parse(
  await readFile(new URL("./days.json", import.meta.url), "utf8"),
);

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

function escapeICSText(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function createEvent(day, date) {
  const dateString = formatDate(date);
  const uid = `${dateString}-${encodeURIComponent(day.name)}@calendar-days`;

  return [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatDate(new Date())}T000000Z`,
    `SUMMARY:${escapeICSText(day.name)}`,
    `DTSTART;VALUE=DATE:${dateString}`,
    "END:VEVENT",
  ].join("\r\n");
}

async function generateCalendar() {
  const events = [];

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    for (const day of daysData) {
      const date = calculateDayDate(day, year);

      if (date === null) {
        continue;
      }

      events.push(createEvent(day, date));
    }
  }

  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Calendar Days Project//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  await writeFile(new URL("./days.ics", import.meta.url), calendar, "utf8");

  console.log(`Created days.ics with ${events.length} events.`);
}

generateCalendar().catch((error) => {
  console.error("Failed to generate calendar:", error);
  process.exitCode = 1;
});
