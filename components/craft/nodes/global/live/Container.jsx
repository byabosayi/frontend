import {getResponsiveValues} from '@/utils/responsive'
import {Box} from '@mui/material'

export default function Container({
  children,
  minHeight = 'content',
  width = '100%',
  mx = 'auto',
  my = 1,
  px = 1,
  py = 1,
  display = 'block',
  justifyContent = 'start',
  alignItems = 'start',
  bgcolor = 'background.paper',
  border = null,
  component = 'section',
}) {
  return (
    <Box
      component={component}
      sx={{
        minHeight: getResponsiveValues(minHeight),
        width: getResponsiveValues(width),
        mx: getResponsiveValues(mx),
        my: getResponsiveValues(my),
        px: getResponsiveValues(px),
        py: getResponsiveValues(py),
        display: getResponsiveValues(display),
        justifyContent: getResponsiveValues(justifyContent),
        alignItems: getResponsiveValues(alignItems),
        bgcolor: getResponsiveValues(bgcolor),
        border: getResponsiveValues(border),
      }}
    >
      {children}
    </Box>
  )
}
