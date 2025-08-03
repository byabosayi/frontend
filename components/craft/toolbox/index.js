'use client'
import Drawer from '@mui/material/Drawer'
import {Box, IconButton, Tooltip} from '@mui/material'
import Layers from './Layers'
import {useState} from 'react'
import {useEditor} from '@craftjs/core'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Tooltop from './top'
import Toolmiddle from './middle'
import Toolbottom from './bottom'

const drawerWidth = 250

export default function Toolbox({type}) {
  const [layersOpen, setLayersOpen] = useState(false)
  const toggleLayers = () => setLayersOpen((prev) => !prev)

  const {actions, isEditing} = useEditor((state, query) => ({
    isEditing: state.options.isEditing !== false,
  }))

  const toogleEditing = () => {
    actions.setOptions((opts) => {
      opts.isEditing = !isEditing
    })
  }

  return (
    <>
      <Tooltip title={isEditing ? 'Preview' : 'Edit'}>
        <IconButton
          size="small"
          variant="contained"
          sx={{
            position: 'fixed',
            top: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.shadows[3],
            '&:hover': {
              bgcolor: 'background.default',
            },
          }}
          onClick={toogleEditing}
        >
          {isEditing ? <VisibilityIcon /> : <EditIcon />}
        </IconButton>
      </Tooltip>
      {isEditing && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: 'rgba(0, 0, 0, 0.07)',
              borderRight: 'none',

              /* ① make the drawer itself a column-flex layout */
              display: 'flex',
              flexDirection: 'column',

              /* ①  ⤵︎ never let the whole drawer scroll */
              overflow: 'hidden',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Tooltop onToggleLayers={toggleLayers} />

          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            role="presentation"
          >
            <Toolmiddle type={type} />

            {layersOpen && <Layers />}

            <Toolbottom />
          </Box>
        </Drawer>
      )}
    </>
  )
}
