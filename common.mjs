// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

export function getGreeting() {
  return "Hello";
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function calculateDayDate(day, year) {
  const month = monthNames.indexOf(day.monthName);
  const weekday = dayNames.indexOf(day.dayName);

  const occurrences = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
  };

if (month === -1 || weekday === -1) {
  throw new Error("Unknown month or weekday");
}

if (day.occurrence === "last") {
  const lastDate = new Date(year, month + 1, 0);
  const lastWeekday = lastDate.getDay();

  const daysBack = (lastWeekday - weekday + 7) % 7;

  return new Date(year, month, lastDate.getDate() - daysBack);
}

const occurrence = occurrences[day.occurrence];

if (!occurrence) {
  throw new Error("Unsupported date pattern");
}
const firstWeekday = new Date(year, month, 1).getDay();

const firstMatch = 1 + (weekday - firstWeekday + 7) % 7;

const date = firstMatch + (occurrence - 1) * 7;

const result = new Date(year, month, date);

if (result.getMonth() !== month) {
  return null;
}

return result;
}
