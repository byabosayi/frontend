import {Box, Button, IconButton, Tooltip} from '@mui/material'
import Link from 'next/link'
import {
  DarkMode,
  Language as LanguageIcon,
  Menu,
  Person,
  Search as SearchIcon,
  ShoppingCart,
} from '@mui/icons-material'
import Search from '../../LayoutClient/AppBar/Search'
import ColorMode from '../../LayoutClient/AppBar/ColorMode'
import Account from '../../LayoutClient/AppBar/Account'
import Language from '../../LayoutClient/AppBar/Language'
import CreateSite from '../../LayoutClient/AppBar/CreateSite'
import MobileDrawerMenu from '../../LayoutClient/AppBar/MobileDrawerMenu'
import Popper from '@/components/Popper'
import CartBadge from '../../LayoutClient/AppBar/CartBadge'
import {useTranslations} from 'next-intl'

export default function PrimaryMenu() {
  const t = useTranslations('global.appbar')

  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Box sx={{display: {xs: 'none', md: 'flex'}, alignItems: 'center'}}>
        {/* Search */}
        <Popper
          elId="search"
          keepOpen
          title={
            <IconButton
              aria-label="Search Anything"
              sx={{color: 'text.primary'}}
            >
              <SearchIcon />
            </IconButton>
          }
        >
          <Search />
        </Popper>

        {/* Cart */}

        <CartBadge>
          <Tooltip title={t('got_to_cart')}>
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

        {/* Color mode switcher */}
        <ColorMode>
          <DarkMode aria-label="Darkmode" />
        </ColorMode>

        {/* Language switcher */}
        <Popper
          elId="language"
          keepOpen
          title={
            <IconButton
              aria-label="Language"
              sx={{color: 'text.primary'}}
            >
              <LanguageIcon />
            </IconButton>
          }
        >
          <Language />
        </Popper>

        {/* Account */}
        <Popper
          elId="account"
          keepOpen
          title={
            <IconButton
              aria-label="Account login or register"
              sx={{color: 'text.primary'}}
            >
              <Person />
            </IconButton>
          }
        >
          <Account />
        </Popper>
      </Box>

      <CreateSite>
        <Button
          variant="contained"
          component={Link}
          href="/register"
          sx={{
            mr: {xs: 0.3, md: 0.5},
            fontSize: {xs: '12px !important', md: '15px !important'},
            px: {xs: '5px !important', md: '10px !important'},
            letterSpacing: {xs: '0 !important', md: '0.5px !important'},
          }}
        >
          {t('create_free_website')}
        </Button>
      </CreateSite>

      <Button
        variant="contained"
        component={Link}
        href="/products"
        sx={{
          fontSize: {xs: '12px !important', md: '15px !important'},
          px: {xs: '5px !important', md: '10px !important'},
          letterSpacing: {xs: '0 !important', md: '0.5px !important'},
        }}
      >
        {t('see_wholesale_products')}
      </Button>

      <Box sx={{display: {xs: 'flex', md: 'none'}}}>
        <MobileDrawerMenu>
          <Menu
            fontSize="small"
            aria-label="Mobile menu"
            sx={{color: 'text.primary', cursor: 'pointer'}}
          />
        </MobileDrawerMenu>
      </Box>
    </Box>
  )
}
