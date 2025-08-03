'use client'

import {useState, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  Typography,
} from '@mui/material'
import Link from 'next/link'

import api from '@/libs/axios'
import {setSnackbar} from '@/libs/redux/slices/global'
import {useLocale} from 'next-intl'

export default function AddToWebsite({children, product}) {
  const isLoggedIn = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()
  const locale = useLocale()

  const [open, setOpen] = useState(false)
  const [autoDropship, setAutoDropship] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const isDropshipAvailable = product.is_dropship_available

  const notify = (message, serverity = 'success') =>
    dispatch(setSnackbar({open: true, message, serverity}))

  const submit = useCallback(
    async (auto) => {
      if (!isLoggedIn) {
        notify('প্রোডাক্টটি সাইটে যুক্ত করতে লগিন করুন', 'error')
        return
      }

      try {
        setSubmitting(true)
        const {data} = await api.post(
          `/wholesaler/products/${product.id}/add-to-retailer-product-list`,
          {automatic_dropship: isDropshipAvailable ? auto : false}
        )
        notify(data.message, 'success')
        setOpen(false)
      } catch (err) {
        notify(
          err?.response?.data?.message[locale] ?? 'Something went wrong',
          'error'
        )
      } finally {
        setSubmitting(false)
        setOpen(false)
      }
    },
    [isLoggedIn, isDropshipAvailable, product.id]
  )

  const handleClick = () => {
    if (isDropshipAvailable) {
      setOpen(true)
    } else {
      submit(false)
    }
  }

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        size="small"
        onClick={handleClick}
        disabled={isDropshipAvailable ? false : submitting}
      >
        {!isDropshipAvailable && submitting ? (
          <CircularProgress size={18} />
        ) : (
          children
        )}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{'.MuiDialog-paper': {p: 2, minWidth: {xs: '85vw', md: '30vw'}}}}
      >
        <Box>
          <Typography>Add to your website with automatic dropship</Typography>

          <Checkbox
            checked={autoDropship}
            onChange={(e) => setAutoDropship(e.target.checked)}
            sx={{ml: -1}} // align nicer with text if you want
          />

          <Typography
            fontSize="0.8rem"
            sx={{mb: 0.5}}
          >
            Whenever you receive an order for this product in your website,
            we'll be notified and start dropshipping process automatically.
          </Typography>
          <Typography
            fontSize="0.8rem"
            sx={{mb: 0.5, fontStyle: 'italic'}}
          >
            You can always turn off automatic dropship from the product edit
            page.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            size="small"
            onClick={() => submit(autoDropship)}
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={26.25} /> : 'Add now'}
          </Button>

          <Typography
            component={Link}
            href="/privacy-policy"
            color="primary"
            fontSize="0.8rem"
            sx={{display: 'block', mt: 0.5, textAlign: 'center'}}
          >
            See our dropship policy
          </Typography>
        </Box>
      </Dialog>
    </>
  )
}
