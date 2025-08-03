'use client'

import {selectSubTotal, selectTotalQty} from '@/libs/redux/selectors/cart'
import {AppBar, Button, Stack, Toolbar} from '@mui/material'
import {useSelector} from 'react-redux'

export default function MobileCartCheckout() {
  const cart = useSelector((state) => state.cart.items)
  const totalQty = useSelector(selectTotalQty)
  const subTotal = useSelector(selectSubTotal)

  return totalQty > 0 ? (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        boxShadow: 'none',
        display: {xs: 'flex', md: 'none'},
      }}
    >
      <Toolbar
        sx={{
          p: 0,
          bgcolor: 'red',
          minHeight: '42px !important',
        }}
        disableGutters
      >
        <Stack
          direction="row"
          //   justifyContent="space-between"
          //   alignItems="center"
          sx={{width: '100%'}}
        >
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              textTransform: 'capitalize',
              py: 1.7,
              px: 0.5,
              fontSize: '0.75rem',
              borderRadius: 0,
              bgcolor: 'secondary.main',
              wordBreak: 'break-all',
            }}
          >
            Cart({totalQty})
          </Button>

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              textTransform: 'capitalize',
              py: 1.7,
              px: 0.5,
              fontSize: '0.75rem',
              borderRadius: 0,
              wordBreak: 'break-all',
            }}
          >
            Checkout({subTotal}৳)
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  ) : null
}
