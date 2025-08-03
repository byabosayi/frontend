'use client'

import Radio from '@/components/Radio'
import TextField from '@/components/TextField'
import {Box, Divider, Typography} from '@mui/material'
import {useTranslations} from 'next-intl'
import Link from 'next/link'
import {Fragment, useState} from 'react'

const radioItems = [
  {label: 'Wholesale Products', value: 'wholesale_products'},
  {label: 'Dropship Products', value: 'dropship_products'},
  {label: 'Auctions', value: 'auctions'},
  {label: 'Themes', value: 'themes'},
  {label: 'Investable Businesses', value: 'investable_businesses'},
]

const searchedItems = [
  // {title: 'Product 1', route: '/products/product-slug-1'},
  // {title: 'Product 2', route: '/products/product-slug-2'},
  // {title: 'Product 3', route: '/products/product-slug-3'},
  // {title: 'Product 4', route: '/products/product-slug-4'},
  // {title: 'Product 5', route: '/products/product-slug-5'},
  // {title: 'Product 6', route: '/products/product-slug-6'},
  // {title: 'Product 7', route: '/products/product-slug-7'},
  // {title: 'Product 8', route: '/products/product-slug-8'},
  // {title: 'Product 9', route: '/products/product-slug-9'},
  // {title: 'Product 10', route: '/products/product-slug-10'},
]

export default function Search() {
  const [type, setType] = useState('wholesale_products')
  const t = useTranslations('global')

  const translatedRadioItems = radioItems.map((item) => ({
    ...item,
    label: t(`appbar.${item.value}`),
  }))

  return (
    <Box sx={{p: 1}}>
      <Typography>
        {t('search_by')}: {t(`appbar.${type}`)}
      </Typography>
      <Radio
        name="search"
        items={translatedRadioItems}
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <TextField
        variant="outlined"
        label={t('type_to_search')}
        sx={{my: 1}}
      />

      {searchedItems && searchedItems.length > 0 ? (
        searchedItems.map((item, index) => (
          <Fragment key={index}>
            <Box
              component={Link}
              href={item.route}
            >
              <Box
                sx={{
                  '&:hover': {bgcolor: 'rgba(0, 255, 85, 0.08) !important'},
                  py: 0.5,
                }}
              >
                <Typography>{item.title}</Typography>
              </Box>
            </Box>

            {searchedItems.indexOf(item) !== searchedItems.length - 1 && (
              <Divider sx={{my: 0.5}} />
            )}
          </Fragment>
        ))
      ) : (
        <Typography
          variant="body2"
          sx={{my: 1}}
        >
          {t('no_results_found')}
        </Typography>
      )}
    </Box>
  )
}
