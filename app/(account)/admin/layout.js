'use client'

import AuthGate from './LayoutClient/AuthGate'
import {Box, Toolbar, useMediaQuery} from '@mui/material'
import {useState} from 'react'
import AppBar from '../ComponentsClient/AppBar'
import Drawer from '../ComponentsClient/Drawer'
import Breadcrumbs from '../ComponentsClient/Breadcrumbs'

import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import PeopleIcon from '@mui/icons-material/People'
const drawerMenus = [
  {
    id: 'dashboard',
    title: 'Admin Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    id: 'products',
    title: 'Products',
    href: '/dashboard/products',
    icon: <InventoryIcon />,
    children: [
      {
        id: 'prod-test',
        title: 'Test Products',
        href: '/dashboard/products/test',
      },
    ],
  },
  {
    id: 'orders',
    title: 'Orders',
    href: '/dashboard/orders',
    icon: <PeopleIcon />,
    children: [
      {
        id: 'test-orders',
        title: 'Test orders',
        href: '/dashboard/orders/test',
      },
      {
        id: 'test-orders-2',
        title: 'Test orders 2',
        href: '/dashboard/orders/test-2',
      },
    ],
  },
]

const drawerWidth = 240

export default function Layout({children}) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const [openDrawer, setOpenDrawer] = useState(isMobile ? false : true)

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  return (
    <AuthGate>
      <Box sx={{display: 'flex'}}>
        <AppBar onDrawerToggle={handleDrawerToggle} />
        <Drawer
          open={openDrawer}
          drawerWidth={drawerWidth}
          isMobile={isMobile}
          menus={drawerMenus}
          onClose={handleDrawerClose}
        />
        <Box
          component="main"
          sx={{
            p: 2,
            width: '100%',
          }}
        >
          <Toolbar /> {/* For spacing below app bar */}
          <Breadcrumbs />
          {children}
        </Box>
      </Box>
    </AuthGate>
  )
}
