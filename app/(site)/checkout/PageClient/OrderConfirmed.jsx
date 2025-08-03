'use client'

import {TaskAlt} from '@mui/icons-material'
import {Box, Button, Dialog, Grid, Stack, Typography} from '@mui/material'
import Link from 'next/link'

export default function OrderConfirmed({open, setOpen, order}) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{'.MuiDialog-paper': {p: 2, minWidth: {xs: '85vw', md: '30vw'}}}}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TaskAlt
            sx={{
              mr: 1,
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'green',
            }}
          />
          <Typography
            variant="h4"
            sx={{fontWeight: 'bold'}}
          >
            Thank You, Order Confirmed!
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{mb: 2, textAlign: 'center'}}
        >
          Your order has been placed successfully, we will notify you soon!
        </Typography>

        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <tbody>
            <tr>
              <td>Order ID:</td>
              <td>123456</td>
            </tr>
            <tr>
              <td>Order Date:</td>
              <td>2023-01-01</td>
            </tr>
            <tr>
              <td>Delivery Address:</td>
              <td>123 Main St, New York</td>
            </tr>
            <tr>
              <td>Total Amount:</td>
              <td>$100</td>
            </tr>
          </tbody>
        </table>

        <Button
          component={Link}
          href="/dashboard/my-orders/10"
          variant="contained"
          fullWidth
          sx={{mt: 2, mb: 1}}
        >
          See Order Details
        </Button>
        <Typography sx={{textAlign: 'center', fontSize: '0.8rem'}}>
          For Enquary: +88017777777(WhatsApp)
        </Typography>
      </Box>
    </Dialog>
  )
}
