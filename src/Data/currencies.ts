export type Currency = {
  country: string;
  code: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
  { country: "United States", code: "USD", symbol: "$" },
  { country: "United Kingdom", code: "GBP", symbol: "£" },
  { country: "Finland", code: "EUR", symbol: "€" },
  { country: "Sweden", code: "SEK", symbol: "kr" },
  { country: "Norway", code: "NOK", symbol: "kr" },
  { country: "Denmark", code: "DKK", symbol: "kr" },
  { country: "Russia", code: "RUB", symbol: "₽" },
  { country: "Germany", code: "EUR", symbol: "€" },
  { country: "Japan", code: "JPY", symbol: "¥" },
  { country: "Switzerland", code: "CHF", symbol: "CHF" },
  { country: "Canada", code: "CAD", symbol: "C$" },
  { country: "Australia", code: "AUD", symbol: "A$" },
];
