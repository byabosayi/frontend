'use client'

import {Breadcrumbs as MuiBreadcrumbs, Link, Typography} from '@mui/material'
import {usePathname, useRouter} from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname() ?? ''
  const router = useRouter()
  const segments = pathname.split('/').filter(Boolean) // ['', 'dashboard', 'products'] → ['dashboard','products']

  if (!segments.length) return null

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      sx={{mb: 2}}
    >
      {segments.map((seg, i) => {
        const href = '/' + segments.slice(0, i + 1).join('/')
        const isLast = i === segments.length - 1
        const label = seg
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase())

        return isLast ? (
          <Typography
            key={href}
            color="text.primary"
          >
            {label}
          </Typography>
        ) : (
          <Link
            key={href}
            underline="hover"
            color="inherit"
            onClick={() => router.push(href)}
            sx={{cursor: 'pointer'}}
          >
            {label}
          </Link>
        )
      })}
    </MuiBreadcrumbs>
  )
}
