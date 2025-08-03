'use client'

import {getResponsiveValues} from '@/utils/responsive'
import {useEditor, useNode} from '@craftjs/core'
import {Paper} from '@mui/material'
import AddIcon from './AddIcon'

export default function RootContainer({
  padding = 0,
  bgcolor = 'transparent',
  children,
}) {
  const {connectors, selected, hovered, component} = useNode((node) => ({
    hovered: node.events.hovered,
    selected: node.events.selected,
    component: node.data?.props?.component || 'div',
  }))

  const {isEditing, device} = useEditor((state) => ({
    isEditing: state.options.isEditing !== false,
    device: state.options.device || 'desktop',
  }))

  const show = hovered || selected

  return (
    <Paper
      component={component}
      elevation={0}
      ref={(ref) => connectors.connect(ref)}
      sx={{
        p: isEditing && !children ? 2 : getResponsiveValues(padding, device),
        bgcolor,
        border: isEditing
          ? show
            ? '1px dashed #2196f3'
            : '1px dashed rgba(0, 0, 0, 0.35)'
          : 'none',
      }}
    >
      {!isEditing || children ? children : <AddIcon />}
    </Paper>
  )
}

RootContainer.craft = {
  displayName: 'RootContainer',
}
