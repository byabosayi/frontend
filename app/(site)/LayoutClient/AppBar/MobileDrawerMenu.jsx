'use client'

import {
  Search as SearchIcon,
  ShoppingCart,
  Language as LanguageIcon,
  LanguageOutlined,
  GavelOutlined,
  // LaptopMacOutlined,
  CampaignOutlined,
  AccountBalanceOutlined,
  PaletteOutlined,
  LocalShippingOutlined,
  WarehouseOutlined,
  DarkMode,
} from '@mui/icons-material'
import {
  Box,
  Dialog,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import {useCallback, useState} from 'react'
// import GotoRetailerSite from './GotoRetailerSite'
import MobileAccount from './MobileAccount'
import ColorMode from './ColorMode'
import Search from './Search'
import Language from './Language'
import CartBadge from './CartBadge'
import {useTranslations} from 'next-intl'

const Menu = ({href, title, Icon, toggleDrawer}) => {
  return (
    <Box
      component={Link}
      href={href}
      sx={{display: 'flex', alignItems: 'center', mb: 1.5}}
      onClick={() => toggleDrawer(false)}
    >
      <Icon
        fontSize="small"
        sx={{mr: 1}}
      />
      <Typography color="text.primary">{title}</Typography>
    </Box>
  )
}

export default function MobileDrawerMenu({children}) {
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState(null)
  const t = useTranslations('global')

  const toggleDrawer = useCallback((open) => setOpen(open), [open])
  const handleDialogOpen = useCallback((type) => {
    setOpen(false)
    setDialogOpen(true)
    if (type === 'search') {
      setDialogContent(<Search />)
    }

    if (type === 'language') {
      setDialogContent(<Language />)
    }
  }, [])
  return (
    <>
      <Dialog
        open={dialogOpen}
        sx={{
          '.MuiDialog-paper': {
            p: 1,
            minWidth: {xs: '85vw', md: '30vw'},
          },
        }}
        onClose={() => setDialogOpen(false)}
      >
        {dialogContent}
      </Dialog>
      <Drawer
        sx={{
          //   width: 220,
          // flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            // boxSizing: 'border-box',
            // overflow: 'hidden',
          },
        }}
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        <Toolbar
          sx={{
            bgcolor: 'background.default',
            minHeight: '45px',
            justifyContent: 'space-between',
          }}
        >
          {/* Search */}
          <Tooltip title={t('search_anything')}>
            <IconButton
              aria-label="Search Anything"
              sx={{color: 'text.primary'}}
              onClick={() => handleDialogOpen('search')}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>

          {/* Cart */}
          <CartBadge>
            <Tooltip title={t('appbar.got_to_cart')}>
              <IconButton
                component={Link}
                href="/cart"
                aria-label="Cart"
                sx={{color: 'text.primary'}}
              >
                <ShoppingCart />
              </IconButton>
            </Tooltip>
          </CartBadge>

          {/* Darkmode switcher */}
          <ColorMode>
            <DarkMode aria-label="Darkmode" />
          </ColorMode>

          {/* Language switcher */}
          <Tooltip title={t('appbar.change_language')}>
            <IconButton
              aria-label="Change language"
              sx={{color: 'text.primary'}}
              onClick={() => handleDialogOpen('language')}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>

        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            bgcolor: 'background.paper',
          }}
        >
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Menu
              href="/products"
              title={t('appbar.wholesale_products')}
              Icon={WarehouseOutlined}
              toggleDrawer={toggleDrawer}
            />

            {/* <Menu
              href="/dynamic-retailer-site-by-username"
              title="আমার সাইট"
              Icon={LaptopMacOutlined}
              toggleDrawer={toggleDrawer}
            /> */}

            <Menu
              href="/dropshipping"
              title={t('appbar.dropshipping')}
              Icon={LocalShippingOutlined}
              toggleDrawer={toggleDrawer}
            />

            <Menu
              href="/auctions"
              title={t('appbar.auctions')}
              Icon={GavelOutlined}
              toggleDrawer={toggleDrawer}
            />

            <Menu
              href="/digital-marketing"
              title={t('appbar.digital_marketing')}
              Icon={CampaignOutlined}
              toggleDrawer={toggleDrawer}
            />

            <Menu
              href="/themes"
              title={t('appbar.themes')}
              Icon={PaletteOutlined}
              toggleDrawer={toggleDrawer}
            />

            <Menu
              href="/invest"
              title={t('appbar.invest')}
              Icon={AccountBalanceOutlined}
              toggleDrawer={toggleDrawer}
            />

            <Menu
              href="/domain"
              title={t('appbar.domain')}
              Icon={LanguageOutlined}
              toggleDrawer={toggleDrawer}
            />
          </Box>

          <Box
            sx={{
              bgcolor: 'background.default',
              p: 1,
            }}
          >
            <MobileAccount />
          </Box>
        </Box>
      </Drawer>

      <IconButton
        size="small"
        // aria-label="Menu Appbar"
        // aria-controls="menu-appbar"
        // aria-haspopup="true"
        sx={{color: 'text.primary'}}
        onClick={() => toggleDrawer(true)}
      >
        {children}
      </IconButton>
    </>
  )
}
