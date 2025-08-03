'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setSnackbar} from '@/libs/redux/slices/global'
import {addItem} from '@/libs/redux/slices/cart'
import {useLocale} from 'next-intl'
import api from '@/libs/axios'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Radio from '@/components/Radio'
import Link from 'next/link'

export default function PrepareItem({children, item, title, addToCart}) {
  const router = useRouter()
  const dispatch = useDispatch()
  const locale = useLocale()
  const storeItemQty = useSelector(
    (state) => state.cart.items.find((i) => i.id === item.id)?.qty || 0
  )

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('wholesale')
  const [attrOptionIds, setAttrOptionIds] = useState([])

  // Derived state
  const hasAttributes = item.formatted.attributes.length > 0
  const maxQty = Number(item.stock)
  const minQty =
    type === 'wholesale'
      ? item.wholesale_min_order_qty
      : item.dropship_min_order_qty
  const [qty, setQty] = useState(minQty)

  const ready =
    qty >= minQty &&
    qty <= maxQty &&
    (!hasAttributes ||
      attrOptionIds.length === item.formatted.attributes.length)

  const handleAddVariant = async () => {
    if (!ready || loading) return

    setLoading(true)

    try {
      const {data} = await api.get(`wholesaler/products/${item.id}/price`, {
        params: {quantity: qty + (addToCart ? Number(storeItemQty) : 0), type},
      })

      const price = Number(data?.data?.price ?? 0)
      if (!price) return

      if (addToCart) {
        dispatch(
          addItem({
            id: item.id,
            slug: item.slug,
            name: item.name,
            thumbnail: item.thumbnail,
            attribute_option_ids: attrOptionIds,
            qty,
            price,
            type,
          })
        )

        // After adding qty substract qty(get from cart redux store) from maxQty

        // If minQty becomes greater than or equal to maxQty, set minQty to maxQty or 0

        // reset state
        setType('wholesale')
        setAttrOptionIds([])
        // setQty(minQty)
        setOpen(false)
      } else {
        const params = new URLSearchParams({
          buynow: 'true',
          type,
          id: String(item.id),
          qty: String(qty),
          price: String(price),
          // 'sub-total': String(price * qty),
          // tax: '0',
          // 'shipping-total': '0',
          // 'shipping-method': 'cod',
          // 'coupon-discount': '0',
          // 'coupon-code': '',
          // 'grand-total': String(price * qty),
          slug: item.slug,
          name: item.name,
          thumbnail: item.thumbnail,
        })
        if (attrOptionIds.length > 0)
          params.set('attribute_option_ids', attrOptionIds.join(','))

        router.push(`/checkout?${params.toString()}`)
      }
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message:
            error?.response?.data?.message[locale] || 'Error fetching price',
          severity: 'error',
        })
      )
    } finally {
      setLoading(false)
    }
  }

  const handleQtyChange = (e) => {
    const value = Math.max(
      minQty,
      Math.min(maxQty, Number(e.target.value) || minQty)
    )
    setQty(value)
  }

  const handleAttributeChange = (attrId, optionId) => {
    setAttrOptionIds((prev) => {
      // 1. Remove any existing option for this attribute
      const otherAttrOptions = prev.filter(
        (id) =>
          !item.formatted.attributes
            .find((a) => a.id === attrId)
            ?.options.some((o) => o.id === id)
      )
      // 2. Add the new selected option
      return [...otherAttrOptions, Number(optionId)]
    })
  }

  /* keep qty ≥ minQty when type changes */
  useEffect(() => setQty((q) => (q < minQty ? minQty : q)), [minQty])

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        size="small"
        disabled={item.stock <= 0}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{'.MuiDialog-paper': {p: 2, minWidth: {xs: '85vw', md: '30vw'}}}}
      >
        <Box>
          {item.is_dropship_available && (
            <Box mb={2}>
              <Typography variant="body2">Select Product Type:</Typography>
              <Radio
                name="product-type"
                items={[
                  {label: 'Wholesale', value: 'wholesale'},
                  {label: 'Dropship', value: 'dropship'},
                ]}
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Box>
          )}

          <TextField
            label={`Quantity (Min: ${minQty}, Max: ${maxQty})`}
            type="number"
            size="small"
            fullWidth
            value={qty}
            slotProps={{htmlInput: {min: minQty, max: maxQty}}}
            onChange={handleQtyChange}
            sx={{mb: 1}}
          />

          {hasAttributes && (
            <Box mb={2}>
              <Typography>Select Attributes:</Typography>
              {item.formatted.attributes.map((attr) => (
                <Box
                  key={attr.id}
                  mb={2}
                >
                  <Typography>{attr.name}</Typography>
                  <Radio
                    name={`attr-${attr.id}`}
                    items={attr.options.map((opt) => ({
                      label: opt.value,
                      value: String(opt.id), // Radios need string values
                    }))}
                    value={String(
                      attrOptionIds.find((id) =>
                        attr.options.some((o) => o.id === id)
                      ) || ''
                    )}
                    onChange={(e) =>
                      handleAttributeChange(attr.id, e.target.value)
                    }
                  />
                </Box>
              ))}
            </Box>
          )}

          <Stack
            direction="row"
            spacing={1}
            mt={2}
          >
            <Button
              fullWidth
              variant="contained"
              disabled={!ready || loading}
              onClick={handleAddVariant}
            >
              {loading ? <CircularProgress size={20} /> : title}
            </Button>
            <Button
              fullWidth
              variant="contained"
              component={Link}
              href={`/products/${item.slug}`}
            >
              View Details
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </>
  )
}
