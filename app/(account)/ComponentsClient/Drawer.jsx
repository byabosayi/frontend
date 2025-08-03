'use client'

import {Drawer as MuiDrawer, Toolbar} from '@mui/material'
import DrawerMenus from './DrawerMenus'

export default function Drawer({
  open = true,
  drawerWidth = 240,
  isMobile = false,
  menus,
  onClose,
}) {
  return (
    <MuiDrawer
      sx={{
        display: open ? 'block' : 'none',
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',

          // Reduce scroll bar width
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '3px',
          },
        },
      }}
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Toolbar />

      <DrawerMenus
        menus={menus}
        isMobile={isMobile}
        closeDrawer={onClose}
      />
    </MuiDrawer>
  )
}
