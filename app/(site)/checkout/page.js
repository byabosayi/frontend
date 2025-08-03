'use client'

import Card from '@/components/Card'
import NoResultCard from '@/components/NoResultCard'
import Radio from '@/components/Radio'
import Section from '@/components/Section'
import TextField from '@/components/TextField'
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField as MuiTextField,
  Typography,
} from '@mui/material'
import MiniItemList from './PageClient/MiniItemList'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useSearchParams} from 'next/navigation'
import BdAddressForm from '@/components/BDAddressForm'
import OrderConfirmed from './PageClient/OrderConfirmed'

export default function Page() {
  const searchParams = useSearchParams()
  const [items, setItems] = useState([])
  const cartItems = useSelector((state) => state.cart.items)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('cod')

  const handleProcessOrder = () => {
    setOrderConfirmed(true)
  }

  useEffect(() => {
    if (searchParams.get('buynow') && searchParams.get('buynow') === 'true') {
      let item = searchParams.entries()

      item = Object.fromEntries(item)

      setItems([item])
    } else {
      setItems(cartItems)
    }
  }, [searchParams, cartItems])
  return (
    <Section>
      {items.length <= 0 ? (
        <NoResultCard href="/products" />
      ) : (
        <Grid
          container
          spacing={1}
        >
          <Grid size={{xs: 12, md: 9}}>
            <Card sx={{p: {xs: 1, md: 1.5}}}>
              <Box>
                <Typography sx={{fontWeight: 'medium'}}>
                  Delivery Address
                </Typography>
              </Box>

              <Divider sx={{mt: 1, mb: 2}} />

              {/* <TextField
                label="Country"
                value="Bangladesh"
                sx={{mb: 1}}
                disabled
                autoFocus
              />

              <TextField
                label="Division"
                required
                sx={{mb: 1}}
              />

              <TextField
                label="District"
                required
                sx={{mb: 1}}
              />

              <TextField
                label="Upazila"
                required
                sx={{mb: 1}}
              />

              <TextField
                label="Union"
                sx={{mb: 1}}
              />

              <TextField
                label="Road/Village/Landmark"
                required
                sx={{mb: 1}}
              />

              <TextField
                label="Phone"
                required
                sx={{mb: 1}}
              /> */}
              <BdAddressForm
                lang="bn"
                prefix="shipping"
                defaultValues={{shippingcountry: 14}}
                onChange={(v) => console.log(v)}
              />

              <MuiTextField
                fullWidth
                label="Phone"
                // value={phone}
                variant="filled"
                size="small"
                sx={{
                  mt: 2,
                  '.MuiInputBase-root:before': {
                    borderBottom: 'none !important',
                  },
                  '.MuiInputBase-root': {
                    borderRadius: 1,
                  },
                  '.MuiInputBase-root:after': {
                    borderBottom: 'none !important',
                  },
                }}
              />
            </Card>
          </Grid>

          <Grid size={{xs: 12, md: 3}}>
            <Card sx={{p: {xs: 1, md: 1.5}}}>
              <OrderConfirmed
                open={orderConfirmed}
                setOpen={setOrderConfirmed}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{mb: 1}}
                onClick={handleProcessOrder}
              >
                Confirm Order
              </Button>

              <Box sx={{mb: 1, fontSize: '0.8rem'}}>
                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{mb: 0.5}}
                >
                  <Box>Subtotal</Box>
                  <Box>100</Box>
                </Stack>

                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{mb: 0.5}}
                >
                  <Box>Shipping</Box>
                  <Box>0</Box>
                </Stack>

                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{mb: 0.5}}
                >
                  <Box>Tax</Box>
                  <Box>0</Box>
                </Stack>

                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{mb: 0.5}}
                >
                  <Box>Discount</Box>
                  <Box>0</Box>
                </Stack>

                <Divider sx={{my: 0.5}} />

                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box sx={{fontWeight: 'bold', fontSize: '0.9rem'}}>Total</Box>
                  <Box sx={{fontWeight: 'bold'}}>0</Box>
                </Stack>
              </Box>
              <Box sx={{display: 'flex'}}>
                <TextField
                  // variant="outlined"
                  fullWidth
                  label="Apply Coupon"
                  borderRadius="4px 0 0 4px"
                />
                <Button
                  variant="contained"
                  sx={{borderRadius: '0 4px 4px 0 !important'}}
                >
                  Apply
                </Button>
              </Box>

              <Box>
                {/* Add method images/icons here */}
                <Radio
                  name="payment"
                  items={[
                    {
                      label: (
                        <Typography fontSize="0.8rem">
                          Cash on Delivery
                        </Typography>
                      ),
                      value: 'cod',
                    },
                  ]}
                  //   defaultValue={locale}
                  value={paymentMethod}
                  // onChange={handleChange}
                />
                <Box
                  sx={{bgcolor: 'background.default', p: 1, fontSize: '0.8rem'}}
                >
                  Currently, only Cash on Delivery (COD) is available.
                </Box>
              </Box>

              <Divider sx={{my: 2}} />

              <Typography
                fontWeight="bold"
                sx={{mb: 1, fontSize: '0.85rem'}}
              >
                Order Items
              </Typography>

              <MiniItemList items={items} />
            </Card>
          </Grid>
        </Grid>
      )}
    </Section>
  )
}
