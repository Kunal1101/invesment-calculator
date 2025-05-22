"use strict";
const calculateInvestment = (data) => {
    const { initialAmount, annualContribution, expectedReturn, duration } = data;
    if (initialAmount < 0)
        return "Initial amount must be more than 0";
    if (duration <= 0)
        return "No valid years";
    if (expectedReturn <= 0)
        return "Expected return must be more than 0";
    let total = initialAmount;
    let totalContribution = 0;
    let totalInterestEarned = 0;
    const annualResults = [];
    for (let i = 0; i < duration; i++) {
        total = total * (1 + expectedReturn / 100);
        totalContribution += annualContribution;
        total += annualContribution;
        totalInterestEarned = total - totalContribution - initialAmount;
        annualResults.push({
            year: `${i + 1}`,
            totalAmount: total,
            totalContribution,
            totalInterestEarned,
        });
    }
    return annualResults;
};
const appendResults = (results) => {
    const table = document.querySelector("#resultTable");
    table.innerHTML = ""; // Clear previous results
    if (typeof results === "string") {
        table.innerHTML = `
      <tr>
        <td colspan="5" class="px-4 py-2 text-red-400 text-center">${results}</td>
      </tr>
    `;
        return;
    }
    for (const result of results) {
        table.innerHTML += `
      <tr>
        <td class="px-4 py-2">${result.year}</td>
        <td class="px-4 py-2">${result.totalAmount.toFixed(2)}</td>
        <td class="px-4 py-2">${result.totalContribution.toFixed(2)}</td>
        <td class="px-4 py-2">${result.totalInterestEarned.toFixed(2)}</td>
      </tr>
    `;
    }
};
const button = document.querySelector("#calculate-btn");
button.addEventListener("click", () => {
    console.log("click");
    const investmentData = {
        initialAmount: Number(document.querySelector("#initial")?.value),
        annualContribution: Number(document.querySelector("#contribution")?.value),
        expectedReturn: Number(document.querySelector("#return")?.value),
        duration: Number(document.querySelector("#duration")?.value),
    };
    const results = calculateInvestment(investmentData);
    appendResults(results);
});
