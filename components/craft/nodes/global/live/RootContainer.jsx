import {getResponsiveValues} from '@/utils/responsive'
import {Paper} from '@mui/material'

export default function RootContainer({
  children,
  padding = 0,
  bgcolor = 'transparent',
  component = 'main',
}) {
  return (
    <Paper
      component={component}
      elevation={0}
      sx={{
        p: getResponsiveValues(padding),
        bgcolor: getResponsiveValues(bgcolor),
      }}
    >
      {children}
    </Paper>
  )
}
