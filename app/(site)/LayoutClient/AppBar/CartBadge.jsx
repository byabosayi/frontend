'use client'

import {selectTotalQty} from '@/libs/redux/selectors/cart'
import {Badge} from '@mui/material'
import {useSelector} from 'react-redux'

export default function CartBadge({children}) {
  const totalQty = useSelector(selectTotalQty)

  return (
    <Badge
      badgeContent={totalQty}
      color="error"
      sx={{
        '& .MuiBadge-badge': {
          py: 0,
          px: 0.5,
          height: '15px',
          fontSize: '0.7rem',
          right: '7px',
          top: '7px',
        },
      }}
    >
      {children}
    </Badge>
  )
}
