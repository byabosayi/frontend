'use client'

import {getResponsiveValues} from '@/utils/responsive'
import {useEditor, useNode} from '@craftjs/core'
import {Typography} from '@mui/material'

export default function Title({
  color = 'text.primary',
  text = 'I am a title',
  border,
}) {
  const {
    connectors: {connect, drag},
    hovered,
  } = useNode((node) => ({
    hovered: node.events.hovered,
  }))

  const {isEditing, device} = useEditor((state) => ({
    isEditing: state.options.isEditing !== false,
    device: state.options.device || 'desktop',
  }))

  return (
    <Typography
      ref={(ref) => connect(drag(ref))}
      variant="h4"
      sx={{
        color: getResponsiveValues(color, isEditing ? device : null),
        border:
          isEditing && hovered && !border
            ? '1px dashed #2196f3'
            : getResponsiveValues(border, isEditing ? device : null),
        // isEditing && !border
        //   ? hovered
        //     ? '1px dashed #2196f3'
        //     : '1px dashed rgba(0, 0, 0, 0.35)'
        //   : getResponsiveValues(border, isEditing ? device : null),
      }}
    >
      {text}
    </Typography>
  )
}

Title.craft = {
  props: {color: 'text.primary', text: 'I am a title'},
  //   related: {settings: TitleSettings},
  displayName: 'Title',
}
