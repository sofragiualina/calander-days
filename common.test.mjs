import test from "node:test";
import assert from "node:assert/strict";
import { calculateDayDate } from "./common.mjs";

test("Finds the second Tuesday of October 2026", () => {
  const event = {
    monthName: "October",
    dayName: "Tuesday",
    occurrence: "second",
  };

  const result = calculateDayDate(event, 2026);

  assert.equal(result.getFullYear(), 2026);
  assert.equal(result.getMonth(), 9);
  assert.equal(result.getDate(), 13);
});

test("Finds the last Friday of October 2026", () => {
  const event = {
    monthName: "October",
    dayName: "Friday",
    occurrence: "last",
  };

  const result = calculateDayDate(event, 2026);

  assert.equal(result.getFullYear(), 2026);
  assert.equal(result.getMonth(), 9);
  assert.equal(result.getDate(), 30);
});

test("February 1900 ends on the 28th", () => {
  const event = {
    monthName: "February",
    dayName: "Wednesday",
    occurrence: "last",
  };

  const result = calculateDayDate(event, 1900);

  assert.equal(result.getFullYear(), 1900);
  assert.equal(result.getMonth(), 1);
  assert.equal(result.getDate(), 28);
});

test("Finds February 29 in leap year 2024", () => {
  const event = {
    monthName: "February",
    dayName: "Thursday",
    occurrence: "fifth",
  };

  const result = calculateDayDate(event, 2024);

  assert.equal(result.getFullYear(), 2024);
  assert.equal(result.getMonth(), 1);
  assert.equal(result.getDate(), 29);
});

test("Finds the second Tuesday of October 2030", () => {
  const event = {
    monthName: "October",
    dayName: "Tuesday",
    occurrence: "second",
  };

  const result = calculateDayDate(event, 2030);

  assert.equal(result.getFullYear(), 2030);
  assert.equal(result.getMonth(), 9);
  assert.equal(result.getDate(), 8);
});

test("Returns null when a fifth weekday does not exist", () => {
  const event = {
    monthName: "February",
    dayName: "Monday",
    occurrence: "fifth",
  };

  assert.equal(calculateDayDate(event, 2026), null);
});
