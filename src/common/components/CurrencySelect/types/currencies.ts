export type AvailableCurrencies = "PLN" | "USD" | "EUR" | "GBP";

export const currencies = [
  {
    label: "PLN",
    value: "PLN",
    symbol: "zł",
  },
  {
    label: "USD",
    value: "USD",
    symbol: "$",
  },
  {
    label: "EUR",
    value: "EUR",
    symbol: "€",
  },
  {
    label: "GBP",
    value: "GBP",
    symbol: "£",
  },
];

export const getCurrencySymbolByValue = (value: AvailableCurrencies) => {
  const currency = currencies.find((currency) => currency.value === value);
  return currency?.symbol || "";
};
