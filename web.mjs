import { calculateDayDate } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

const monthYear = document.querySelector("#month-year");
const previousButton = document.querySelector("#previous-month");
const nextButton = document.querySelector("#next-month");
const calendarGrid = document.querySelector("#calendar-grid");
const monthSelect = document.querySelector("#month-select");
const yearSelect = document.querySelector("#year-select");

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar() {
  const selectedDate = new Date(currentYear, currentMonth, 1);

  monthYear.textContent = selectedDate.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  calendarGrid.replaceChildren();

  const firstDay = selectedDate.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const eventDates = daysData.map((event) => ({
    name: event.name,
    date: calculateDayDate(event, currentYear),
  }));

  // Add empty cells before the first day of the month.
  for (let space = 0; space < firstDay; space++) {
    const emptyCell = document.createElement("div");
    emptyCell.setAttribute("aria-hidden", "true");
    calendarGrid.appendChild(emptyCell);
  }

  // Create a calendar cell for each day of the month.
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    const date = new Date(currentYear, currentMonth, day);

    dayCell.classList.add("calendar-day");
    dayCell.setAttribute(
      "aria-label",
      date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );

    const dateLabel = document.createElement("span");
    dateLabel.textContent = day;
    dayCell.appendChild(dateLabel);

    if (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      dayCell.classList.add("today");
      dayCell.setAttribute("aria-current", "date");
    }

    for (const event of eventDates) {
      if (
        event.date !== null &&
        event.date.getMonth() === currentMonth &&
        event.date.getDate() === day
      ) {
        const eventName = document.createElement("p");
        eventName.classList.add("event-name");
        eventName.textContent = event.name;
        dayCell.appendChild(eventName);
      }
    }

    calendarGrid.appendChild(dayCell);
  }

  // Add trailing empty cells to complete the calendar rows.
  const totalCells = firstDay + daysInMonth;
  const trailingCells = (7 - (totalCells % 7)) % 7;

  for (let space = 0; space < trailingCells; space++) {
    const emptyCell = document.createElement("div");
    emptyCell.setAttribute("aria-hidden", "true");
    calendarGrid.appendChild(emptyCell);
  }

  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
}

renderCalendar();

nextButton.addEventListener("click", () => {
  currentMonth++;

  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  renderCalendar();
});

previousButton.addEventListener("click", () => {
  currentMonth--;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  renderCalendar();
});

monthSelect.addEventListener("change", () => {
  currentMonth = Number(monthSelect.value);
  renderCalendar();
});

yearSelect.addEventListener("change", () => {
  if (yearSelect.value === "" || !yearSelect.checkValidity()) {
    return;
  }

  currentYear = Number(yearSelect.value);
  renderCalendar();
});
