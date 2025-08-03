'use client'
import {Box, IconButton, Tooltip} from '@mui/material'
import Image from 'next/image'
import AppsIcon from '@mui/icons-material/Apps'
import LayersIcon from '@mui/icons-material/Layers'
import RedoIcon from '@mui/icons-material/Redo'
import UndoIcon from '@mui/icons-material/Undo'
import {useEditor} from '@craftjs/core'
import {useRouter} from 'next/navigation'

export default function Tooltop({onToggleLayers}) {
  const router = useRouter()
  const {actions, canRedo, canUndo} = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }))

  const redirect = () => {
    // Check unsaved changes
    if (canUndo || canRedo) {
      if (
        window.confirm(
          'You have unsaved changes! Are you sure you want to leave?'
        )
      ) {
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,

        display: 'flex',
        alignItems: 'center',
        padding: 0.5,
        bgcolor: '#1a237e', // indigo 900 (MUI Color)
      }}
    >
      <Box
        sx={{flexGrow: 1, cursor: 'pointer'}}
        onClick={redirect}
      >
        <Image
          src="/byabosayi-logo-light.svg"
          alt="Byabosayi Logo"
          width={80}
          height={30}
        />
      </Box>

      <Box sx={{color: 'white'}}>
        <Tooltip title="All elements">
          <IconButton
            size="small"
            color="inherit"
            sx={{p: 0.5}}
            onClick={() => actions.selectNode(null)}
          >
            <AppsIcon
              fontSize="inherit"
              color="inherit"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Watch Layers">
          <IconButton
            size="small"
            color="inherit"
            sx={{p: 0.5}}
            onClick={onToggleLayers}
          >
            <LayersIcon
              fontSize="inherit"
              color="inherit"
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Undo">
          <IconButton
            disabled={!canUndo}
            size="small"
            color="inherit"
            sx={{p: 0.5}}
            onClick={() => actions.history.undo()}
          >
            <UndoIcon
              fontSize="inherit"
              color="inherit"
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Redo">
          <IconButton
            disabled={!canRedo}
            size="small"
            color="inherit"
            sx={{p: 0.5}}
            onClick={() => actions.history.redo()}
          >
            <RedoIcon
              fontSize="inherit"
              color="inherit"
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
