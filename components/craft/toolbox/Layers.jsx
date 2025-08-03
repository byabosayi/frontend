'use client'

import {Box, Divider, Typography} from '@mui/material'
import {Layers as CraftLayers} from '@craftjs/layers'

export default function Layers() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '50%',
        // border: '1px solid red',

        transition: 'height 300ms',
        overflow: 'auto',
        bgcolor: 'rgba(0, 0, 0, 0.06)', // indigo-900 with a bit of opacity
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          // bgcolor: 'rgba(0, 0, 0, 0.06)',
          px: 1,
          py: 0.5,
        }}
      >
        {/* <Typography
          fontWeight={'bold'}
          fontSize={'caption'}
        >
          Layers
        </Typography> */}
        <Typography
          variant="body2"
          fontWeight={'bold'}
        >
          Layers
        </Typography>
      </Box>
      <Divider />
      <CraftLayers />
    </Box>
  )
}
