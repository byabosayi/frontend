'use client'

import {Box, Toolbar, useMediaQuery} from '@mui/material'
import {useState} from 'react'
import AppBar from '../../ComponentsClient/AppBar'
import Drawer from '../../ComponentsClient/Drawer'
import Breadcrumbs from '../../ComponentsClient/Breadcrumbs'
import {
  AccountBalance,
  Assessment,
  Copyright,
  Gavel,
  Image as ImageIcon,
  Inventory,
  List,
  People,
  Settings,
  ShoppingBag,
  ShoppingCart,
  ThumbUp,
  Web,
} from '@mui/icons-material'

// const drawerMenus = [
//   {
//     id: 'dashboard',
//     title: 'Dashboard',
//     href: '/dashboard',
//     icon: <DashboardIcon />,
//   },
//   {
//     id: 'products',
//     title: 'Products',
//     href: '/dashboard/products',
//     icon: <InventoryIcon />,
//     children: [
//       {
//         id: 'prod-test',
//         title: 'Test Products',
//         href: '/dashboard/products/test',
//       },
//     ],
//   },
//   {
//     id: 'orders',
//     title: 'Orders',
//     href: '/dashboard/orders',
//     icon: <PeopleIcon />,
//     children: [
//       {
//         id: 'test-orders',
//         title: 'Test orders',
//         href: '/dashboard/orders/test',
//       },
//       {
//         id: 'test-orders-2',
//         title: 'Test orders 2',
//         href: '/dashboard/orders/test-2',
//       },
//     ],
//   },
// ]

const drawerMenus = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    href: '/dashboard',
    icon: <Assessment />,
  },
  {
    id: 'media',
    title: 'Media',
    href: '/dashboard/media',
    icon: <ImageIcon />,
  },
  {
    id: 'menus',
    title: 'Menus',
    href: '/dashboard/menus',
    icon: <List />,
  },
  {
    id: 'pages',
    title: 'Pages',
    href: '/dashboard/pages',
    icon: <Web />,
  },
  {
    id: 'footer',
    title: 'Footer',
    href: '/dashboard/footer',
    icon: <Copyright />,
  },
  {
    id: 'products',
    title: 'Products',
    // href: '/dashboard/products',
    icon: <Inventory />,
    children: [
      {
        id: 'all-products',
        title: 'All Products',
        href: '/dashboard/products',
      },
      {
        id: 'add-new',
        title: 'Add New',
        href: '/dashboard/products/add-new',
      },
      {
        id: 'categories',
        title: 'Categories',
        href: '/dashboard/products/categories',
      },
      {
        id: 'attributes',
        title: 'Attributes',
        href: '/dashboard/products/attributes',
      },
    ],
  },
  {
    id: 'customer-orders',
    title: 'Customer Orders',
    href: '/dashboard/customer-orders',
    icon: <ShoppingBag />,
  },
  {
    id: 'my-orders',
    title: 'My Orders',
    href: '/dashboard/my-orders',
    icon: <ShoppingCart />,
  },
  {
    id: 'bids',
    title: 'Bids',
    href: '/dashboard/bids',
    icon: <Gavel />,
  },
  {
    id: 'fundings',
    title: 'Fundings',
    href: '/dashboard/fundings',
    icon: <AccountBalance />,
  },
  {
    id: 'customers',
    title: 'Customers',
    href: '/dashboard/customers',
    icon: <People />,
  },
  {
    id: 'reviews',
    title: 'Reviews',
    href: '/dashboard/reviews',
    icon: <ThumbUp />,
  },
  {
    id: 'settings',
    title: 'Settings',
    // href: '/dashboard/settings',
    icon: <Settings />,
    children: [
      {
        id: 'account',
        title: 'Account',
        href: '/dashboard/settings',
      },
      {
        id: 'shipping',
        title: 'Shipping',
        href: '/dashboard/settings/shipping',
      },
      {
        id: 'payment',
        title: 'Payment',
        href: '/dashboard/settings/payment',
      },
      {
        id: 'custom-domain',
        title: 'Custom Domain',
        href: '/dashboard/settings/custom-domain',
      },
      {
        id: 'others',
        title: 'Others',
        href: '/dashboard/settings/others',
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
  )
}
