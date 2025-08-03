'use client'

import {useNode} from '@craftjs/core'
import {Typography} from '@mui/material'
import ColorPicker from './global/ColorPicker'
import PaddingSlider from './global/PaddingSlider'

export default function ContainerSettings() {
  const {name} = useNode((node) => ({
    name: node.data.displayName || node.data.name,
  }))

  return (
    <>
      <Typography
        variant="subtitle2"
        gutterBottom
      >
        {name}
      </Typography>

      <PaddingSlider />

      <ColorPicker />
    </>
  )
}
