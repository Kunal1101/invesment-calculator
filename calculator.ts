import { CalculationResult, InvestmentData, InvestmentResult } from "./types";

const calculateInvestment = (data: InvestmentData): CalculationResult => {
  const { initialAmount, annualContibution, expectedReturn, duration } = data;
  if (initialAmount < 0) return "Initial amount must be more then 0";
  if (duration <= 0) return "No valid years";
  if (expectedReturn <= 0) return "Expected return must be more then 0";

  let total = initialAmount;
  let totalContribution = 0;
  let totalInterestEarned = 0;

  const annualResults: InvestmentResult[] = [];

  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn);
    totalInterestEarned = total - totalContribution - initialAmount;
    totalContribution = totalContribution + annualContibution;
    total = total + annualContibution;

    annualResults.push({
      year: `Year ${i + 1}`,
      totalAmount: total,
      totalInterestEarned,
      totalContribution,
    });
  }
  return annualResults;
};

const printResults = (results: CalculationResult) => {
  if (typeof results === "string") return console.log(results);

  for (const yearEndResults of results) {
    console.log(yearEndResults.year);
    console.log(`Total: ${yearEndResults.totalAmount.toFixed(0)}`);
    console.log(
      `Total Contribution: ${yearEndResults.totalContribution.toFixed(0)}`
    );
    console.log(
      `Total Interest Earned: ${yearEndResults.totalInterestEarned.toFixed(0)}`
    );
  }
};

const investmentData: InvestmentData = {
  initialAmount: 5000,
  annualContibution: 500,
  expectedReturn: 0.08,
  duration: 10,
};
const results = calculateInvestment(investmentData);

printResults(results);
