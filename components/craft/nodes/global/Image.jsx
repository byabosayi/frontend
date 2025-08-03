'use client'

import {useEditor, useNode} from '@craftjs/core'
import {Box} from '@mui/material'

export default function Image({
  src = '',
  alt = 'Byabosayi',
  width = '100%',
  height = 'auto',
  ...props
}) {
  const {
    connectors: {connect, drag},
  } = useNode()

  const {isEditing, device} = useEditor((state) => ({
    isEditing: state.options.isEditing !== false,
    device: state.options.device || 'desktop',
  }))

  return (
    <Box
      ref={(ref) => connect(drag(ref))}
      sx={{
        display: 'inline-block',
        cursor: isEditing ? 'pointer' : 'auto',
      }}
    >
      <img
        src={src || 'https://placehold.co/600x400?text=Image'}
        alt={alt}
        style={{
          width,
          height,
          display: 'block',
          maxWidth: '100%',
        }}
        draggable={false}
      />
    </Box>
  )
}

Image.craft = {
  displayName: 'Image',
}
