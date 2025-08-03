'use client'

import {useEditor, useNode} from '@craftjs/core'
import {Slider, Typography, Box} from '@mui/material'
import ColorPicker from './global/ColorPicker'

export default function PaddingSlider(title = 'Padding', propName = 'padding') {
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

  // Get the current color value for the active device
  const current = propValue?.[device] ?? propValue ?? 1

  return (
    <Box>
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{display: 'block'}}
      >
        {title}
      </Typography>
      <Slider
        size="small"
        valueLabelDisplay="auto"
        marks
        // getAriaValueText={(v) => v + 'px'}
        value={current}
        min={0}
        max={10}
        step={0.5}
        onChange={(_, v) => setResponsive(propName, {target: {value: v}})}
        // onChange={(_, v) => setProp((p) => (p[propName] = v))}
      />
    </Box>
  )
}
