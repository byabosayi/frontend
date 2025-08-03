'use client'

import {useEditor, useNode} from '@craftjs/core'
import {Box} from '@mui/material'
import {getResponsiveValues} from '@/utils/responsive'
import AddIcon from './AddIcon'

export default function Flexbox({
  children,
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  wrap = 'nowrap',
  gap = 0,
  padding = 1,
  marginBottom = 1,
  margin = 0,
  width = '100%',
  bgcolor = 'transparent',
  border,
}) {
  const {
    connectors: {connect, drag},
    selected,
    hovered,
  } = useNode((node) => ({
    hovered: node.events.hovered,
    selected: node.events.selected,
  }))

  const {isEditing, device} = useEditor((state) => ({
    isEditing: state.options.isEditing !== false,
    device: state.options.device || 'desktop',
  }))

  const show = hovered || selected

  return (
    <Box
      ref={(ref) => connect(drag(ref))}
      sx={{
        display: 'flex',
        p: getResponsiveValues(padding, isEditing ? device : null),
        mb: getResponsiveValues(marginBottom, isEditing ? device : null),
        border:
          isEditing && !border
            ? show
              ? '1px dashed #2196f3'
              : '1px dashed rgba(0, 0, 0, 0.35)'
            : getResponsiveValues(border, isEditing ? device : null),
        cursor: isEditing ? 'move' : 'auto',
      }}
    >
      {!isEditing || children ? children : <AddIcon />}
    </Box>
  )
}

Flexbox.craft = {
  displayName: 'Flexbox',
}
