'use client'

import {useEditor, useNode} from '@craftjs/core'
import {Typography, Box} from '@mui/material'

export default function ColorPicker({
  title = 'Background Color',
  propName = 'bgcolor',
}) {
  const {
    actions: {setProp},
    // Get the prop value using the dynamic propName
    [propName]: propValue,
  } = useNode((node) => ({
    [propName]: node.data.props[propName],
  }))

  const {device} = useEditor((state) => ({
    device: state.options.device || 'desktop',
  }))

  const setResponsive = (propKey, e) => {
    setProp((p) => {
      // Ensure the prop is an object that can hold responsive values
      const currentValue = p[propKey] || {}

      return {
        ...p,
        [propKey]: {
          ...currentValue,
          [device]: e.target.value,
        },
      }
    }, 200)
  }

  // Get the current value for the active device
  const current = propValue?.[device] ?? propValue ?? '#7fbd4dff'

  return (
    <Box>
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{display: 'block'}}
      >
        {title}
      </Typography>
      <Box
        component="input"
        type="color"
        value={current}
        onChange={(e) => setResponsive(propName, e)}
        sx={{
          border: 'none',
          padding: 0,
          width: 40,
          height: 32,
          background: 'none',
          cursor: 'pointer',
          '&::-webkit-color-swatch-wrapper': {padding: 0},
          '&::-webkit-color-swatch': {
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          },
          '&::-moz-color-swatch': {
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          },
        }}
      />
    </Box>
  )
}
