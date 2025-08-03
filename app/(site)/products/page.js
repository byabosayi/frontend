import Card from '@/components/Card'
import Section from '@/components/Section'
import api from '@/libs/axios'
import {SearchOff} from '@mui/icons-material'
import {Box, Button, Grid, Typography} from '@mui/material'
import ProductCard from './PageServer/ProductCard'
import {unstable_cache} from 'next/cache'
import Link from 'next/link'
import NoResultCard from '@/components/NoResultCard'

const fetchProducts = unstable_cache(
  async (searchParams) => {
    try {
      const response = await api.get('wholesaler/products', {
        params: searchParams,
      })
      return response?.data?.data ?? []
    } catch (err) {
      return []
    }
  },
  ['wholesale-products-list'], // cache key
  {revalidate: 120} // seconds
)

export default async function Page({searchParams}) {
  const products = await fetchProducts(searchParams)

  return (
    <Section>
      <Grid
        container
        spacing={1}
      >
        <Grid
          size={2.5}
          display={{xs: 'none', md: 'block'}}
        >
          <Card>Filters</Card>
        </Grid>
        <Grid size={{xs: 12, md: 9.5}}>
          <Box>
            <Card sx={{mb: 1}}>Sort</Card>
            <Grid
              container
              spacing={1}
              // direction="row"
              // sx={{
              //   justifyContent: 'space-between',
              //   alignItems: 'flex-start',
              // }}
            >
              {products && products.length > 0 ? (
                products.map((product) => (
                  <Grid
                    key={product.id}
                    size={{xs: 6, md: 4, lg: 3}}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <NoResultCard href="/products" />
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Section>
  )
}
