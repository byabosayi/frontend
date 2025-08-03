import {Card as MuiCard} from '@mui/material'
import {memo} from 'react'

export default memo(function Card({children, sx, ...props}) {
  return (
    <MuiCard
      sx={{
        m: 'auto',
        p: 1,
        borderRadius: 2,
        width: '100%',
        height: '100%',
        backgroundImage: 'unset !important',
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem',
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  )
})
