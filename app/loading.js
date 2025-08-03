import {LinearProgress} from '@mui/material'

export default function Loading() {
  return (
    <LinearProgress
      color="primary"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 2,
        '& .MuiLinearProgress-bar': {
          animationDuration: '2s', // Slower animation for better visibility
        },
      }}
    />
  )
}
