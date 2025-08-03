'use client'

import {IconButton, Tooltip} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import {LightMode} from '@mui/icons-material'
import {useColorMode} from '@/libs/MuiThemeProvider'
import {useTranslations} from 'next-intl'

export default function ColorMode({children}) {
  const theme = useTheme()
  const {toggle} = useColorMode()
  const t = useTranslations('global.appbar')

  return (
    <Tooltip
      title={
        theme.palette.mode === 'dark'
          ? t('enable_light_mode')
          : t('enable_dark_mode')
      }
      arrow
    >
      <IconButton
        id="darkmode"
        aria-label="darkmode"
        sx={{color: 'text.primary'}}
        onClick={toggle}
      >
        {theme.palette.mode === 'dark' ? <LightMode /> : children}
      </IconButton>
    </Tooltip>
  )
}
