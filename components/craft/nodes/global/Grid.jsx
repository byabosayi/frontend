'use client'

import {getResponsiveValues} from '@/utils/responsive'
import {useEditor, useNode} from '@craftjs/core'
import {Grid as MuiGrid} from '@mui/material'
import AddIcon from './AddIcon'

export default function Grid({
  spacing = 1,
  padding = 2,
  marginBottom = 1,
  border,
  children,
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
    <MuiGrid
      container
      ref={(ref) => connect(drag(ref))}
      spacing={getResponsiveValues(spacing, isEditing ? device : null)}
      direction="row"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
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
    </MuiGrid>
  )
}

Grid.craft = {
  displayName: 'Grid',
}
