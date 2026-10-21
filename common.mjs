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

  if (month === -1 || weekday === -1) {
    throw new Error("Unknown month or weekday");
  }

  const occurrences = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
  };

  // Find the last occurrence of a weekday in the month.
  if (day.occurrence === "last") {
    const lastDate = new Date(year, month + 1, 0);
    const daysBack = (lastDate.getDay() - weekday + 7) % 7;

    return new Date(year, month, lastDate.getDate() - daysBack);
  }

  const occurrence = occurrences[day.occurrence];

  if (!occurrence) {
    throw new Error("Unsupported date pattern");
  }

  // Find the first occurrence of the requested weekday.
  const firstWeekday = new Date(year, month, 1).getDay();
  const firstMatch = 1 + ((weekday - firstWeekday + 7) % 7);

  // Move forward by the required number of weeks.
  const date = firstMatch + (occurrence - 1) * 7;
  const result = new Date(year, month, date);

  // Return null if the requested occurrence does not exist.
  if (result.getMonth() !== month) {
    return null;
  }

  return result;
}
