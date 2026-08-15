export function formatPrice(amount: number, currency: "KES" | "USD", billing?: string) {
  const formatted =
    currency === "KES"
      ? new Intl.NumberFormat("en-KE", {
          style: "currency",
          currency: "KES",
          maximumFractionDigits: 0,
        }).format(amount)
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(amount);

  if (billing === "weekly") return `${formatted}/week`;
  if (billing === "monthly") return `${formatted}/mo`;
  return formatted;
}
