'use client'

import {useEditor} from '@craftjs/core'
import {Box, Typography, Button as MaterialButton, Button} from '@mui/material'
import {createElement} from 'react'

export default function SelectedSettings() {
  const {actions, selected} = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected
    let selected

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name:
          state.nodes[currentNodeId].data.displayName ||
          state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related?.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
        parent: state.nodes[currentNodeId].data.parent,
        state,
      }
    }

    return {
      selected,
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      <Typography
        variant="body1"
        color="text.primary"
      >
        Edit: <Box component="strong">{selected.name}</Box>
      </Typography>
      {/* {selected?.settings && createElement(selected.settings)} */}
      {selected?.settings ? (
        createElement(selected.settings)
      ) : (
        <Typography variant="caption">No settings available</Typography>
      )}

      {selected.parent && (
        <Button
          fullWidth
          size="small"
          variant="outlined"
          onClick={() => actions.selectNode(selected.parent)}
        >
          Select parent
        </Button>
      )}

      {selected.isDeletable && (
        <MaterialButton
          size="small"
          variant="outlined"
          color="error"
          onClick={() => actions.delete(selected.id)}
        >
          Delete
        </MaterialButton>
      )}
    </Box>
  )
}
