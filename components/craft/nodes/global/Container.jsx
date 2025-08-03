'use client'

import {getResponsiveValues} from '@/utils/responsive'
import {useEditor, useNode} from '@craftjs/core'
import {Box} from '@mui/material'
import AddIcon from './AddIcon'

export default function Container({children}) {
  const {
    connectors: {connect, drag},
    selected,
    hovered,

    // sx
    minHeight,
    width,
    mx,
    my,
    px,
    py,
    display,
    justifyContent,
    alignItems,
    bgcolor,
    border,
    component,
  } = useNode((node) => ({
    hovered: node.events.hovered,
    selected: node.events.selected,

    // sx
    minHeight: node.data.props?.minHeight || 'content',
    width: node.data.props?.width || '100%',
    mx: node.data.props?.mx || 'auto',
    my: node.data.props?.my || 1,
    px: node.data.props?.px || 1,
    py: node.data.props?.py || 1,
    display: node.data.props?.display || 'block',
    justifyContent: node.data.props?.justifyContent || 'start',
    alignItems: node.data.props?.alignItems || 'start',
    bgcolor: node.data.props?.bgcolor || 'background.paper',
    border: node.data.props?.border || null,
    component: node.data?.props?.component || 'section',
  }))

  const {isEditing, device} = useEditor((state) => ({
    isEditing: state.options.isEditing !== false,
    device: state.options.device || 'desktop',
  }))

  const show = hovered || selected

  return (
    <Box
      ref={(ref) => connect(drag(ref))}
      component={component}
      sx={{
        minHeight: getResponsiveValues(minHeight, isEditing ? device : null),
        width: getResponsiveValues(width, isEditing ? device : null),
        mx: getResponsiveValues(mx, isEditing ? device : null),
        my: getResponsiveValues(my, isEditing ? device : null),
        px: getResponsiveValues(px, isEditing ? device : null),
        py: getResponsiveValues(py, isEditing ? device : null),
        display: getResponsiveValues(display, isEditing ? device : null),
        justifyContent: getResponsiveValues(
          justifyContent,
          isEditing ? device : null
        ),
        alignItems: getResponsiveValues(alignItems, isEditing ? device : null),
        bgcolor: getResponsiveValues(bgcolor, isEditing ? device : null),
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

Container.craft = {
  displayName: 'Container',
  props: {
    minHeight: 'content',
    width: '100%',
    mx: 'auto',
    my: 1,
    px: 1,
    py: 1,
    display: 'block',
    justifyContent: 'start',
    alignItems: 'start',
    bgcolor: 'background.paper',
    border: null,
    component: 'section',
  },
  rules: {
    canDrag: () => true,
    canMoveIn: (incomingNodes) => true,
    canMoveOut: (outgoingNodes) => true,
    canDrop: (targetNode) => true,
  },
}
