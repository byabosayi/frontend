'use client'

import Card from '@/components/Card'
import NoResultCard from '@/components/NoResultCard'
import Section from '@/components/Section'
import TextField from '@/components/TextField'
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField as MuiTextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import {useSelector} from 'react-redux'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Image from 'next/image'
import {Add, Delete, Remove} from '@mui/icons-material'

function createData(name, calories, fat, carbs, protein) {
  return {name, calories, fat, carbs, protein}
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export default function Page() {
  const items = useSelector((state) => state.cart.items)

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
                <Typography sx={{fontWeight: 'medium'}}>Items</Typography>
              </Box>

              <Divider sx={{mt: 1, mb: 2}} />

              <TableContainer>
                <Table
                  //   sx={{minWidth: 650}}
                  aria-label="cart items"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                        >
                          {/* IMG,{' '}
                          <Typography
                            component={Link}
                            href="/products/slug"
                            variant="body2"
                          >
                            {row.name}
                          </Typography>
                          , Type(Chip), Attrs if any */}

                          <Box sx={{display: 'flex'}}>
                            <Image
                              src="https://images.unsplash.com/photo-1717127412108-ed8a5d68338f"
                              alt={'item.name'}
                              width={50}
                              height={50}
                            />

                            <Box sx={{ml: 1, lineHeight: 1.3}}>
                              <Box
                                component={Link}
                                href={`/products/${'item.slug'}`}
                                sx={{
                                  color: 'text.primary',
                                  '&:hover': {textDecoration: 'underline'},
                                }}
                              >
                                item.name
                              </Box>

                              {/* {item.attrs && item.attrs.length > 0 && ( */}
                              <Box
                                sx={{fontSize: '0.7rem', fontStyle: 'italic'}}
                              >
                                {['Red', 'Small']
                                  .map((attr) => attr)
                                  .join(', ')}
                              </Box>
                              <Box>
                                <Box
                                  sx={{
                                    fontSize: '0.7rem',
                                    color: 'primary.main',
                                  }}
                                >
                                  Wholesale
                                </Box>
                              </Box>
                              {/* )} */}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>100</TableCell>
                        <TableCell>
                          <MuiTextField
                            aria-label="Quantity"
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
                            value={10}
                            onChange={(e) => {
                              console.log(e.target.value)
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            aria-label="Remove cart item"
                          >
                            <Delete sx={{fontSize: '1.1rem'}} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          <Grid size={{xs: 12, md: 3}}>
            <Card sx={{p: {xs: 1, md: 1.5}}}>
              <Button
                fullWidth
                variant="contained"
                sx={{mb: 1}}
                component={Link}
                href="/checkout"
              >
                Checkout
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
            </Card>
          </Grid>
        </Grid>
      )}
    </Section>
  )
}
