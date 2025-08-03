'use client'

import {getResponsiveValues} from '@/utils/responsive'
import {useEditor, useNode} from '@craftjs/core'
import {Grid as MuiGrid} from '@mui/material'
import AddIcon from './AddIcon'
import {useEffect} from 'react'

export default function GridColumn({size = 1, padding = 2, border, children}) {
  const {actions, isEditing, device, query} = useEditor((state, query) => ({
    isEditing: state.options.isEditing !== false,
    device: state.options.device || 'desktop',
    query,
  }))

  const {
    connectors: {connect, drag},
    parent,
    hovered,
    selected,
    width,
  } = useNode((node) => ({
    parent: node.data.parent,
    hovered: node.events.hovered,
    selected: node.events.selected,
    width: node.data.props,
  }))

  const {nodes} = useEditor((state) => ({
    nodes: state.nodes,
  }))

  const show = hovered || selected

  const resizeWidth = () => {
    const siblingIds = query.node(parent).get().data.nodes

    if (siblingIds.length > 0) {
      const w = Math.floor(100 / siblingIds.length) - padding + '%'

      siblingIds.forEach((sid) =>
        actions.setProp(sid, (props) => {
          props.width = w
        })
      )
    }
  }

  useEffect(() => {
    resizeWidth()
  }, [nodes])

  return (
    <MuiGrid
      ref={(ref) => connect(drag(ref))}
      size={getResponsiveValues(Math.floor(size), isEditing ? device : null)}
      sx={{
        // transition: 'all 0.3s ease',
        ...(width || {}),

        p: getResponsiveValues(padding, isEditing ? device : null),
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

GridColumn.craft = {
  displayName: 'GridColumn',
}
