import {Box} from '@mui/material'
import BackToTop from './LayoutClient/BackToTop'
import Footer from './LayoutServer/Footer'
import AppBar from './LayoutServer/AppBar'
import MobileCartCheckout from './LayoutClient/MobileCartCheckout'

export default function Layout({children}) {
  return (
    <>
      <AppBar />

      <Box
        component="main"
        sx={{minHeight: '70vh'}}
      >
        {children}
      </Box>

      <MobileCartCheckout />

      <Footer />

      <BackToTop />
    </>
  )
}
