import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  token: null,
  id: null,
  name: null,
  username: null,
  role: null,
  email: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, {payload}) => {
      state.token = payload?.token
      state.id = payload?.id
      state.name = payload?.name
      state.username = payload?.username
      state.role = payload?.role
      state.email = payload?.email
    },
    clearAuth: () => initialState,
  },
})

export const {setAuth, clearAuth} = slice.actions
export default slice.reducer
