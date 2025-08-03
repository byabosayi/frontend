'use client'

import {useState, useMemo, useEffect, useCallback} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'

// import DashboardIcon from '@mui/icons-material/Dashboard'
// import InventoryIcon from '@mui/icons-material/Inventory'
// import PeopleIcon from '@mui/icons-material/People'
// const items = [
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

export default function DrawerMenus({menus, isMobile, closeDrawer}) {
  const pathname = usePathname() || ''
  const router = useRouter()

  // one "open id" per depth: {0:'products', 1:'prod-all', ...}
  const [expandedPerDepth, setExpandedPerDepth] = useState({})

  // find branch for current URL so it's expanded on load
  const activeBranch = useMemo(() => {
    const result = []
    const walk = (nodes, stack) => {
      nodes.forEach((n) => {
        const nextStack = [...stack, n.id]
        if (n.href && pathname.startsWith(n.href))
          result.splice(0, result.length, ...nextStack)
        if (n.children) walk(n.children, nextStack)
      })
    }
    walk(menus, [])
    return result
  }, [menus, pathname])

  useEffect(() => {
    const next = {}
    activeBranch.forEach((id, depth) => (next[depth] = id))
    setExpandedPerDepth(next)
  }, [activeBranch])

  const toggleAtDepth = useCallback((depth, id) => {
    setExpandedPerDepth((prev) => {
      const next = {...prev}
      next[depth] = prev[depth] === id ? '' : id
      Object.keys(next)
        .map(Number)
        .filter((d) => d > depth)
        .forEach((d) => delete next[d])
      return next
    })
  }, [])

  const handleClick = useCallback(
    (node, depth) => {
      if (node.href) router.push(node.href) // navigate to parent/home route
      if (node.children?.length) toggleAtDepth(depth, node.id) // and open it

      // Close drawer if is mobile and not parent menu
      if (isMobile && node.href) closeDrawer()
    },
    [router, toggleAtDepth]
  )

  const renderNodes = (nodes, depth = 0) =>
    nodes.map((node) => {
      const isParent = !!node.children?.length
      const open = expandedPerDepth[depth] === node.id
      const selected =
        (node.href && pathname === node.href) ||
        (isParent &&
          node.children.some((c) => pathname.startsWith(c.href || '')))

      return (
        <Box
          key={node.id}
          component="div"
        >
          <ListItemButton
            selected={selected}
            onClick={() => handleClick(node, depth)}
            sx={{
              pl: 2 + depth * 2,
              justifyContent: 'flex-start',

              mx: 1,
              borderRadius: 1,
              '&.Mui-selected': {
                bgcolor: 'action.selected',
              },
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&.Mui-selected:hover': {
                bgcolor: 'action.selected',
              },
            }}
          >
            {node.icon && (
              <ListItemIcon sx={{minWidth: 40}}>{node.icon}</ListItemIcon>
            )}
            <ListItemText primary={node.title} />
            {isParent && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          {isParent && (
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
            >
              <List
                disablePadding
                dense
              >
                {renderNodes(node.children, depth + 1)}
              </List>
            </Collapse>
          )}
        </Box>
      )
    })

  return <List component="nav">{renderNodes(menus)}</List>
}
