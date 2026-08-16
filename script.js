const $ = (id) => document.getElementById(id);

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2
  }).format(value || 0);
}

function calculate() {
  const hourly = Math.max(0, parseFloat($("hourlyWage").value) || 0);
  const regularHours = Math.max(0, parseFloat($("hoursPerWeek").value) || 0);
  const weeks = Math.min(52, Math.max(1, parseFloat($("weeksPerYear").value) || 52));
  const overtimeHours = Math.max(0, parseFloat($("overtimeHours").value) || 0);
  const overtimeMultiplier = Math.max(1, parseFloat($("overtimeMultiplier").value) || 1.5);

  const regularWeekly = hourly * regularHours;
  const overtimeWeekly = hourly * overtimeMultiplier * overtimeHours;
  const weekly = regularWeekly + overtimeWeekly;
  const annual = weekly * weeks;
  const regularAnnual = regularWeekly * weeks;
  const overtimeAnnual = overtimeWeekly * weeks;
  const monthly = annual / 12;
  const biweekly = weekly * 2;
  const daily = weekly / 5;

  $("annualPay").textContent = money(annual);
  $("weeklyPay").textContent = money(weekly);
  $("biweeklyPay").textContent = money(biweekly);
  $("monthlyPay").textContent = money(monthly);
  $("dailyPay").textContent = money(daily);
  $("regularAnnual").textContent = money(regularAnnual);
  $("overtimeAnnual").textContent = money(overtimeAnnual);
}

document.addEventListener("DOMContentLoaded", () => {
  $("year").textContent = new Date().getFullYear();
  $("payForm").addEventListener("submit", (event) => {
    event.preventDefault();
    calculate();
  });

  ["hourlyWage", "hoursPerWeek", "weeksPerYear", "overtimeHours", "overtimeMultiplier"]
    .forEach(id => $(id).addEventListener("input", calculate));

  calculate();
});
