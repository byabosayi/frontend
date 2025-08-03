import {createSelector} from '@reduxjs/toolkit'

const selItems = (s) => s.cart.items
const selExtraPricing = (s) => s.cart.extraPricing

export const selectSubTotal = createSelector(selItems, (items) =>
  items.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0)
)

export const selectExtraPricing = createSelector(selExtraPricing, (p) => p)

export const selectGrandTotal = createSelector(
  [selectSubTotal, selExtraPricing],
  (sub, {shipping = {}, tax = {}, coupon = {}}) =>
    sub + (shipping.cost ?? 0) + (tax.amount ?? 0) + (coupon.value ?? 0)
)

export const selectTotalQty = createSelector(selItems, (items) =>
  items.reduce((sum, i) => sum + i.qty, 0)
)
