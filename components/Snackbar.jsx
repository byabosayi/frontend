'use client'

import {setSnackbar} from '@/libs/redux/slices/global'
import {Alert, Snackbar as MuiSnackbar, Slide} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'

function SlideDown(props) {
  return (
    <Slide
      {...props}
      direction="down"
    />
  )
}

export default function Snackbar() {
  const dispatch = useDispatch()
  const {open, message, severity} = useSelector(
    (state) => state.global.snackbar
  )

  return (
    <MuiSnackbar
      key="snackbar"
      open={open}
      autoHideDuration={7000}
      slots={{
        transition: SlideDown,
      }}
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        dispatch(setSnackbar({open: false}))
      }}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      sx={{mt: '60px'}}
    >
      <Alert
        onClose={() => dispatch(setSnackbar({open: false}))}
        severity={severity}
        variant="filled"
        sx={{width: '100%'}}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
