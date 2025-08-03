import Card from '@/components/Card'
import {Box, Stack, Typography} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import PrepareItem from '../PageClient/PrepareItem'
import AddToWebsite from '../PageClient/AddToWebsite'

export default function ProductCard({product}) {
  return (
    <Card sx={{p: 0}}>
      {/* <Box sx={{border: '1px solid rgb(0 0 0 / 8.5%)'}}> */}
      <Box
        component={Link}
        href={`/products/${product.slug}`}
      >
        <Box sx={{position: 'relative', width: '100%', pt: '100%'}}>
          {/* pt = 1:1 ratio */}
          <Image
            src={
              product.thumbnail ? product.thumbnail : '/image-placeholder.svg'
            }
            alt={product.name}
            fill /* 2️⃣ fills the wrapper */
            sizes="(max-width: 600px) 100vw, 200px"
            style={{
              objectFit: 'cover' /* 3️⃣ crop like background-cover */,
              objectPosition: 'top' /* align top edge */,
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          // height: '100%',
          minHeight: 200,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Typography
            color={
              product.stock > 0
                ? product.stock <= 10
                  ? 'error'
                  : 'success'
                : 'error'
            }
            variant="caption"
            fontWeight="bold"
            sx={{mb: 0.3, fontSize: '0.7rem'}}
          >
            {product.stock > 0
              ? product.stock <= 10
                ? `Hurry! Only ${product.stock} left`
                : `${product.stock} in stock`
              : 'Out of Stock'}
          </Typography>

          {product.is_dropship_available && (
            <Typography
              color="success"
              variant="caption"
              fontWeight="bold"
              sx={{mb: 0.3, fontSize: '0.65rem'}}
            >
              ড্রপশিপ অ্যাভেইলেবল
            </Typography>
          )}
        </Stack>

        <Typography
          component={Link}
          href={`/products/${product.slug}`}
          variant="caption"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            '&:hover': {textDecoration: 'underline'},
          }}
        >
          {product.name}
        </Typography>

        {product.prices && product.prices.length > 0 && (
          <table
            style={{
              borderCollapse: 'collapse',
              textAlign: 'left',
              width: '100%',
              marginBottom: '0.5rem',
            }}
          >
            <tbody>
              <tr style={{borderBottom: '1px solid rgb(0 0 0 / 8.5%)'}}>
                <th>
                  <Typography variant="caption">Type</Typography>
                </th>
                <th>
                  <Typography variant="caption">Min Qty</Typography>
                </th>
                <th>
                  <Typography variant="caption">Unit Price</Typography>
                </th>
              </tr>
              {product.formatted.prices.map((price, index) => (
                <tr
                  key={index}
                  style={{borderBottom: '1px solid rgb(0 0 0 / 8.5%)'}}
                >
                  <td>
                    <Typography variant="caption">{price.type}</Typography>
                  </td>
                  <td>
                    <Typography variant="caption">
                      {price.minimum_quantity}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="caption">
                      {price.price_per_unit}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Bottom add to cart button */}
        <Box sx={{mt: 'auto'}}>
          <Stack
            direction={{xs: 'column', sm: 'row'}}
            spacing={0.5}
            justifyContent="space-between"
          >
            <PrepareItem
              item={product}
              title="Add to cart"
              addToCart
            >
              <Typography fontSize={{xs: '0.7rem', md: '0.75rem'}}>
                Add to cart
              </Typography>
            </PrepareItem>
            <PrepareItem
              item={product}
              title="Buy now"
            >
              <Typography fontSize={{xs: '0.7rem', md: '0.75rem'}}>
                Buy now
              </Typography>
            </PrepareItem>
          </Stack>
          {/* If not loggedin ask to login first */}
          <AddToWebsite product={product}>
            <Typography
              fontSize={{xs: '0.7rem', md: '0.75rem'}}
              fontWeight="medium"
            >
              Add to website {product.is_dropship_available && '(ড্রপশিপ)'}
            </Typography>
          </AddToWebsite>
        </Box>
      </Box>
      {/* </Box> */}
    </Card>
  )
}
