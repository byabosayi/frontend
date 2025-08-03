import Logo from '@/components/Logo'
import Section from '@/components/Section'
import {Facebook} from '@mui/icons-material'
import {Box, Divider, Grid, IconButton, Typography} from '@mui/material'
import Link from 'next/link'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{bgcolor: 'background.paper', p: 2}}
    >
      <Section>
        <Grid
          container
          spacing={2}
          justifyContent="space-around"
          sx={{textAlign: 'center'}}
        >
          <Grid size={{xs: 12, md: 4}}>
            <Logo />
            <Typography
              variant="subtitle1"
              sx={{mt: 0.5, fontWeight: 'medium'}}
            >
              Wholesale meets free retail
            </Typography>

            <Typography
              variant="caption"
              sx={{
                mt: 2,
              }}
            >
              Byabosayi is an all-in-one AI driven b2b ecommerce platform in
              Bangladesh with features like wholesale products, free website
              creation, dropshipping, bidding, digital marketing, funding, loan,
              custom domain buy, and many more.
            </Typography>
          </Grid>

          <Grid size={{xs: 12, md: 4}}>
            <Typography variant="subtitle1">Categories</Typography>
            <Typography variant="subtitle1">About</Typography>
            <Typography variant="subtitle1">Contact</Typography>
            <Typography variant="subtitle1">Privacy Policy</Typography>
            <Typography variant="subtitle1">Terms and Conditions</Typography>
          </Grid>

          <Grid size={{xs: 12, md: 4}}>
            <Typography variant="subtitle1">
              Email: info@byabosayi.com | byabosayiofficial@gmail.com
            </Typography>
            <IconButton
              component="a"
              href="https://www.facebook.com/byabosayi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </IconButton>
          </Grid>
        </Grid>

        <Divider sx={{my: 2}} />

        <Box sx={{textAlign: 'center'}}>
          <Typography variant="body2">
            Copyright &copy; 2025 Byabosayi
          </Typography>
        </Box>
      </Section>
    </Box>
  )
}
