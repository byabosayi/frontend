import {createSlice} from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    snackbar: {
      open: false,
      message: '',
      severity: 'success', // ["error","info","success","warning"]
    },
  },
  reducers: {
    setSnackbar: (state, {payload}) => {
      state.snackbar = Object.assign({}, state.snackbar, payload)
    },
  },
})

export const {setSnackbar} = globalSlice.actions

export default globalSlice.reducer
