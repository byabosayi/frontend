import {configureStore} from '@reduxjs/toolkit'
import auth from './slices/auth'
import cart from './slices/cart'
import global from './slices/global'

const isBrowser = () => typeof window !== 'undefined'

/* ---------- helpers ---------- */
function load(key, fallback) {
  if (!isBrowser()) return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  if (isBrowser()) localStorage.setItem(key, JSON.stringify(value))
}

/* ---------- create store ---------- */
export function CreateStore() {
  const preloadedState = {
    auth: load('auth', undefined),
    cart: load('cart', undefined),
  }

  const store = configureStore({
    reducer: {global, auth, cart},
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  })

  /* ----- persist on change (simple comparison) ----- */
  if (isBrowser()) {
    let prevAuth = store.getState().auth
    let prevCart = store.getState().cart

    store.subscribe(() => {
      const {auth: a, cart: c} = store.getState()

      if (a !== prevAuth) {
        save('auth', a)
        prevAuth = a
      }

      if (c !== prevCart) {
        save('cart', c)
        prevCart = c
      }
    })
  }

  return store
}
