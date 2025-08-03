import {createSlice} from '@reduxjs/toolkit'

function sameAttrs(a = [], b = []) {
  if (a.length !== b.length) return false
  return a.every((val, idx) => val === b[idx]) // arrays already sorted
}

function sameType(a = '', b = '') {
  return a === b
}

// Check existing item or not by unique attribute_option_ids and type
function sameItem(a, b) {
  return (
    sameAttrs(a.attribute_option_ids, b.attribute_option_ids) &&
    sameType(a.type, b.type)
  )
}

const initialState = {
  items: [],
  extraPricing: {
    shipping: {method: null, cost: 0},
    tax: {rate: 0, amount: 0},
    coupon: {code: null, amount: 0},
  },
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, {payload}) {
      const {id, attribute_option_ids = [], qty, price, type} = payload

      const existing = state.items.find(
        (i) => i.id === id && sameItem(i, {attribute_option_ids, type})
      )

      if (existing) {
        existing.qty += qty // ⬅️ add n
        existing.price = price
      } else {
        state.items.push({
          ...payload,
          attribute_option_ids: attribute_option_ids.slice().sort(), // keep deterministic order
          price,
          type,
          qty,
        })
      }
    },

    updateQty(state, {payload: {id, attribute_option_ids = [], qty, type}}) {
      const item = state.items.find(
        (i) => i.id === id && sameItem(i, {attribute_option_ids, type})
      )
      if (item) item.qty = qty
    },

    removeItem(state, {payload: {id, attribute_option_ids = [], type}}) {
      const idx = state.items.findIndex(
        (i) => i.id === id && sameItem(i, {attribute_option_ids, type})
      )
      if (idx > -1) state.items.splice(idx, 1)
    },

    setShipping(state, {payload}) {
      state.extraPricing.shipping = payload
    },
    setTax(state, {payload}) {
      state.extraPricing.tax = payload
    },
    applyCoupon(state, {payload}) {
      state.extraPricing.coupon = payload
    },
    clearExtras(state) {
      state.extraPricing = initialState.extraPricing
    },

    clearCart: () => initialState,

    replaceCart: (_s, {payload}) => payload,
  },
})

export const {
  addItem,
  updateQty,
  removeItem,
  setShipping,
  setTax,
  applyCoupon,
  clearExtras,
  clearCart,
  replaceCart,
} = cartSlice.actions

export default cartSlice.reducer
