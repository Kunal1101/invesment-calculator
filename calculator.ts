type InvestmentData = {
  initialAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};

type InvestmentResult = {
  year: string;
  totalAmount: number;
  totalContribution: number;
  totalInterestEarned: number;
};

type CalculationResult = InvestmentResult[] | string;

const calculateInvestment = (data: InvestmentData): CalculationResult => {
  const { initialAmount, annualContribution, expectedReturn, duration } = data;
  if (initialAmount < 0) return "Initial amount must be more than 0";
  if (duration <= 0) return "No valid years";
  if (expectedReturn <= 0) return "Expected return must be more than 0";

  let total = initialAmount;
  let totalContribution = 0;
  let totalInterestEarned = 0;

  const annualResults: InvestmentResult[] = [];

  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn / 100);
    totalContribution += annualContribution;
    total += annualContribution;
    totalInterestEarned = total - totalContribution - initialAmount;

    annualResults.push({
      year: `Year ${i + 1}`,
      totalAmount: total,
      totalContribution,
      totalInterestEarned,
    });
  }

  return annualResults;
};

const printResults = (results: CalculationResult) => {
  if (typeof results === "string") {
    console.log(results);
    return;
  }

  for (const yearEndResults of results) {
    console.log(yearEndResults.year);
    console.log(`Total: $${yearEndResults.totalAmount.toFixed(2)}`);
    console.log(
      `Total Contribution: $${yearEndResults.totalContribution.toFixed(2)}`
    );
    console.log(
      `Total Interest Earned: $${yearEndResults.totalInterestEarned.toFixed(2)}`
    );
    console.log("-----");
  }
};

const button = document.querySelector("#calculate-btn")!;

button.addEventListener("click", () => {
  console.log("click");
  const investmentData: InvestmentData = {
    initialAmount: Number(
      (document.querySelector("#initial") as HTMLInputElement)?.value
    ),
    annualContribution: Number(
      (document.querySelector("#contribution") as HTMLInputElement)?.value
    ),
    expectedReturn: Number(
      (document.querySelector("#return") as HTMLInputElement)?.value
    ),
    duration: Number(
      (document.querySelector("#duration") as HTMLInputElement)?.value
    ),
  };

  const results = calculateInvestment(investmentData);
  printResults(results);
});
