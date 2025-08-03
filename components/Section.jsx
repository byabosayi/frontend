import {Box} from '@mui/material'
import {memo} from 'react'

export default memo(function Section({children, sx, ...props}) {
  return (
    <Box
      component="section"
      sx={{
        width: {xs: '100%', xxl: '75%'},
        mx: 'auto',
        p: 0.5,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
})
