export function calculateSubtotal(
  price: number,
  quantity: number
): number {
  return Number((price * quantity).toFixed(2));
}

export function calculateOrderTotal(
  subtotals: number[]
): number {
  return Number(
    subtotals.reduce((total, subtotal) => total + subtotal, 0).toFixed(2)
  );
}