import {
  AccountBalanceOutlined,
  CampaignOutlined,
  GavelOutlined,
  LanguageOutlined,
  LocalShippingOutlined,
  PaletteOutlined,
  WarehouseOutlined,
} from '@mui/icons-material'
import {Box, Typography} from '@mui/material'
import {useTranslations} from 'next-intl'
import Link from 'next/link'

const Menu = ({href, title, Icon}) => {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        lineHeight: 0.25,
        display: {xs: 'inline-block', md: 'flex'},
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Icon
        aria-label={title}
        sx={{
          color: 'text.primary',
          mx: {xs: 0, md: 0.7},
          fontSize: {xs: '1rem', md: '1.2rem'},
        }}
      />
      <Typography
        color="text.primary"
        fontSize={{xs: '0.7rem', md: '0.95rem'}}
        fontWeight="medium"
      >
        {title}
      </Typography>
    </Box>
  )
}

export default function SecondaryMenu() {
  const t = useTranslations('global.appbar')

  return (
    <>
      <Menu
        href="/products"
        title={t('wholesale_products')}
        Icon={WarehouseOutlined}
      />

      <Menu
        href="/dropshipping"
        title={t('dropshipping')}
        Icon={LocalShippingOutlined}
      />

      <Menu
        href="/auctions"
        title={t('auctions')}
        Icon={GavelOutlined}
      />

      <Menu
        href="/digital-marketing"
        title={t('digital_marketing')}
        Icon={CampaignOutlined}
      />

      <Menu
        href="/themes"
        title={t('themes')}
        Icon={PaletteOutlined}
      />

      <Menu
        href="/invest"
        title={t('invest')}
        Icon={AccountBalanceOutlined}
      />
      <Menu
        href="/domain"
        title={t('domain')}
        Icon={LanguageOutlined}
      />
    </>
  )
}
