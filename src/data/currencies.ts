export type Currency = {
  country: string;
  code: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
  { country: "United States", code: "USD", symbol: "$" },
  { country: "United Kingdom", code: "GBP", symbol: "\u00A3" },
  { country: "Finland", code: "EUR", symbol: "\u20AC" },
  { country: "Sweden", code: "SEK", symbol: "kr" },
  { country: "Norway", code: "NOK", symbol: "kr" },
  { country: "Denmark", code: "DKK", symbol: "kr" },
  { country: "Russia", code: "RUB", symbol: "\u20BD" },
  { country: "Germany", code: "EUR", symbol: "\u20AC" },
  { country: "Japan", code: "JPY", symbol: "\u00A5" },
  { country: "Switzerland", code: "CHF", symbol: "CHF" },
  { country: "Canada", code: "CAD", symbol: "C$" },
  { country: "Australia", code: "AUD", symbol: "A$" },
];
