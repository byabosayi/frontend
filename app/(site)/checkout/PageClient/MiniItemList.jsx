'use client'

import {Add, Clear, Remove} from '@mui/icons-material'
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import {Fragment} from 'react'

export default function MiniItemList({items}) {
  return items && items.length > 0
    ? items.map((item, index) => (
        <Fragment key={index}>
          <Box sx={{display: 'flex'}}>
            <Image
              src="https://images.unsplash.com/photo-1717127412108-ed8a5d68338f"
              alt={item.name}
              width={50}
              height={50}
            />

            <Box sx={{ml: 1, fontSize: '0.7rem', lineHeight: 1.3}}>
              <Box
                component={Link}
                href={`/products/${item.slug}`}
                sx={{
                  color: 'text.primary',
                  '&:hover': {textDecoration: 'underline'},
                }}
              >
                {item.name}
              </Box>
              {/* Use formatted price with symbol from backend later */}
              <Box sx={{mt: 0.5}}>
                {item.price} ৳ <Clear fontSize="inherit" />{' '}
                <TextField
                  size="small"
                  sx={{
                    width: '70px',
                    m: 0,
                    '& .MuiInputBase-root': {
                      height: '18px',
                      p: 0,
                      fontSize: '0.85rem',
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{mr: 0, ml: 0.5}}
                        >
                          <IconButton
                            size="small"
                            aria-label="Decrease cart item quantity"
                            edge="start"
                            sx={{p: 0}}
                          >
                            <Remove sx={{fontSize: '1.1rem'}} />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ml: 0, mr: 0.5}}
                        >
                          <IconButton
                            size="small"
                            aria-label="Increase cart item quantity"
                            edge="end"
                            sx={{p: 0}}
                          >
                            <Add sx={{fontSize: '1.1rem'}} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  value={item.quantity}
                  onChange={(e) => {
                    console.log(e.target.value)
                  }}
                />
              </Box>
              {item.attrs && item.attrs.length > 0 && (
                <Box>{item.attrs.map((attr) => attr).join(', ')}</Box>
              )}
            </Box>

            <Box sx={{ml: 'auto'}}>
              <Tooltip
                title="Remove item"
                arrow
              >
                <IconButton
                  size="small"
                  aria-label="remove-item"
                  sx={{
                    color: 'text.primary',
                    // ml: 'auto',
                    fontSize: '0.9rem',
                  }}
                >
                  <Clear fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {index !== items.length - 1 && <Divider sx={{my: 1}} />}
        </Fragment>
      ))
    : null
}
