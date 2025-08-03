'use client'

import {Box, useTheme} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export default function DarkModeLogo({children}) {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  return !isDarkMode ? (
    children
  ) : (
    <Box
      component={Link}
      href="/"
      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    >
      <Image
        src="/byabosayi-logo-light.svg"
        alt="Byabosayi Logo Light | ব্যবসায়ী লোগো লাইট"
        width={80}
        height={30}
        aria-level="Byabosayi Logo Light | ব্যবসায়ী লোগো লাইট"
      />
    </Box>
  )
}
