'use client'

import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
} from '@mui/material'
import {Logout, Menu, Person} from '@mui/icons-material'
import Logo from '@/components/Logo'
import Link from 'next/link'

export default function AppBar({onDrawerToggle}) {
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar
        sx={{
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
          <IconButton
            onClick={onDrawerToggle}
            sx={{mr: 1}}
          >
            <Menu />
          </IconButton>

          <Logo />
        </Box>

        <Tooltip title="My Account">
          <IconButton
            component={Link}
            href="/dashboard/settings"
            aria-label="My Account"
            sx={{color: 'text.primary'}}
          >
            <Person />
          </IconButton>
        </Tooltip>

        <Tooltip title="Logout">
          <IconButton
            aria-label="Logout"
            sx={{color: 'text.primary'}}
          >
            <Logout />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </MuiAppBar>
  )
}
