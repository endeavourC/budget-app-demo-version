export const formatPrice = (
  price: number,
  currency: string = "PLN"
): string => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
  }).format(price);
};
