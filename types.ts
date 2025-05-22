export type InvestmentData = {
  initialAmount: number;
  annualContibution: number;
  expectedReturn: number;
  duration: number;
};

export type InvestmentResult = {
  year: string;
  totalAmount: number;
  totalContribution: number;
  totalInterestEarned: number;
};

export type CalculationResult = InvestmentResult[] | string;
