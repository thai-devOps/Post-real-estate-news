import { DISCOUNT_TYPE } from '~/enums/util.enum'

export function formatCurrency(amount: number): string {
  // Use toLocaleString to format the number with commas
  const formattedAmount = amount.toLocaleString('vi-VN')
  // Append the currency symbol
  return `${formattedAmount} VND`
}

export function handlePriceDiscount(
  price: number,
  discount: { type: DISCOUNT_TYPE; status: boolean; value: number }
): number {
  if (discount.status) {
    if (discount.type === DISCOUNT_TYPE.PERCENT) {
      return price - price * (discount.value / 100)
    } else {
      return price - discount.value
    }
  }
  return price
}
