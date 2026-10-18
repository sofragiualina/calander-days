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

const firstDay = new Date(currentYear, currentMonth, 1).getDay();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

// Add empty cells before the first date.
for (let space = 0; space < firstDay; space++) {
  const emptyCell = document.createElement("div");
  calendarGrid.appendChild(emptyCell);
}

// Add one cell for each date.
for (let day = 1; day <= daysInMonth; day++) {
  const dayCell = document.createElement("div");
  dayCell.classList.add("calendar-day");
  dayCell.textContent = day;

  if (
  day === today.getDate() &&
  currentMonth === today.getMonth() &&
  currentYear === today.getFullYear()
) {
  dayCell.classList.add("today");
}
for (const event of daysData) {
  const eventDate = calculateDayDate(event, currentYear);

  if (
    eventDate !== null &&
    eventDate.getMonth() === currentMonth &&
    eventDate.getDate() === day
  ) {
    const eventName = document.createElement("p");
    eventName.classList.add("event-name");
    eventName.textContent = event.name;

    dayCell.appendChild(eventName);
  }
}
  calendarGrid.appendChild(dayCell);
}

monthSelect.value = currentMonth;
yearSelect.value = currentYear;

previousButton.disabled =
  currentYear === Number(yearSelect.min) && currentMonth === 0;

nextButton.disabled =
  currentYear === Number(yearSelect.max) && currentMonth === 11;
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