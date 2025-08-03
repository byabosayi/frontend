'use client'
import {Button, Box, IconButton, Tooltip} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import SettingsIcon from '@mui/icons-material/Settings'
import HistoryIcon from '@mui/icons-material/History'
import HomeIcon from '@mui/icons-material/Home'
import DownloadIcon from '@mui/icons-material/Download'
import DevicePreview from './DevicePreview'
import {Element, ROOT_NODE, useEditor} from '@craftjs/core'
import {usePathname, useRouter} from 'next/navigation'
import RootContainer from '../../nodes/global/RootContainer'

export default function Toolbottom() {
  const pathname = usePathname()
  const path = pathname.split('/').slice(2).join('/') || 'home'

  const {actions, query} = useEditor()

  const router = useRouter()
  const {canRedo, canUndo} = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }))
  const username = 'retailer' // Get from redux loggedin user

  const handleSave = async () => {
    // await fetch('/api/page', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({data: json}), // ← outer stringify
    // })
    // const {data} = await res.json() // data is the same string

    // Save nodes without the isEditing mode
    actions.setOptions((opts) => {
      opts.isEditing = false
    })

    const json = query.serialize()
    localStorage.setItem('craftjs-json-' + path, json)

    actions.history.clear()

    // Restore the isEditing mode
    actions.setOptions((opts) => {
      opts.isEditing = true
    })
  }

  const resetToDefaultTemplate = () => {
    if (canRedo || canUndo) {
      if (
        !window.confirm(
          'You have unsaved changes! Are you sure you want to reset?'
        )
      ) {
        return
      }
    }

    const HOME_PAGE_DEFAULT_TEMPLATE = {
      ROOT: {
        type: {resolvedName: 'RootContainer'},
        isCanvas: true,
        props: {},
        nodes: [
          'primary_header',
          'secondary_header',
          'main_container',
          'footer',
        ],
        linkedNodes: {},
      },
      primary_header: {
        type: {resolvedName: 'PrimaryHeader'},
        props: {},
        parent: 'ROOT',
      },
      secondary_header: {
        type: {resolvedName: 'SecondaryHeader'},
        props: {},
        parent: 'ROOT',
      },
      main_container: {
        type: {resolvedName: 'Container'},
        isCanvas: true,
        props: {},
        parent: 'ROOT',
        nodes: ['title'],
        linkedNodes: {},
      },
      title: {
        type: {resolvedName: 'Title'},
        props: {text: 'I am from home page'},
        parent: 'main_container',
      },
      footer: {
        type: {resolvedName: 'Footer'},
        props: {},
        parent: 'ROOT',
      },
    }

    const PRODUCTS_PAGE_DEFAULT_TEMPLATE = {
      ROOT: {
        type: {resolvedName: 'RootContainer'},
        isCanvas: true,
        props: {},
        nodes: [
          'primary_header',
          'secondary_header',
          'main_container',
          'footer',
        ],
        linkedNodes: {},
      },
      primary_header: {
        type: {resolvedName: 'PrimaryHeader'},
        props: {},
        parent: 'ROOT',
      },
      secondary_header: {
        type: {resolvedName: 'SecondaryHeader'},
        props: {},
        parent: 'ROOT',
      },
      main_container: {
        type: {resolvedName: 'Container'},
        isCanvas: true,
        props: {},
        parent: 'ROOT',
        nodes: ['title'],
        linkedNodes: {},
      },
      title: {
        type: {resolvedName: 'Title'},
        props: {text: 'I am from products page'},
        parent: 'main_container',
      },
      footer: {
        type: {resolvedName: 'Footer'},
        props: {},
        parent: 'ROOT',
      },
    }

    // actions.history.clear()
    // actions.deserialize(DEFAULT_TEMPLATE)

    if (localStorage.getItem('craftjs-json-' + path))
      localStorage.removeItem('craftjs-json-' + path)

    localStorage.setItem(
      'craftjs-json-' + path,
      JSON.stringify(
        path === 'home'
          ? HOME_PAGE_DEFAULT_TEMPLATE
          : PRODUCTS_PAGE_DEFAULT_TEMPLATE
      )
    )

    window.location.reload()

    // actions.addNodeTree(DEFAULT_TEMPLATE, ROOT_NODE, 0, true)
  }

  const resetToDefault2 = () => {
    // ① create the element you want as the (only) root child
    const jsx = (
      <Element
        is={RootContainer} // your component
        canvas
      />
    )

    /* 2️⃣  Turn JSX → NodeTree (helper lives on editor.query) */
    const tree = query.parseReactElement(jsx).toNodeTree()

    /* 3️⃣  Clear undo/redo, replace the old page with the new tree */
    actions.history.clear()
    actions.addNodeTree(tree, ROOT_NODE, 0, true) // parent = ROOT_NODE
  }

  const setStarterTemplate = () => {
    const STARTER_JSON = `{
    "ROOT": {
      "type": { "resolvedName": "Element" },
      "isCanvas": true,
      "props": {},
      "nodes": ["abcd"],
      "linkedNodes": {},
      "custom": {}
    },
    "RootContainer": {
      "type": { "resolvedName": "RootContainer" },
      "isCanvas": true,
      "props": {},
      "nodes": ["Flexbox"],
      "linkedNodes": {},
      "custom": {}
    },
    "Flexbox": {
      "type": { "resolvedName": "Flexbox" },
      "isCanvas": true,
      "props": {},
      "nodes": ["Button"],
      "linkedNodes": {},
      "custom": {}
    },
    "Button": {
      "type": { "resolvedName": "Button" },
      "isCanvas": false,
      "props": {},
      "nodes": [],
      "linkedNodes": {},
      "custom": {}
    }
  }`

    actions.history.clear()
    actions.deserialize(STARTER_JSON) // <- string, not object
  }

  const goToDashboard = () => {
    // Check unsaved changes
    if (canUndo || canRedo) {
      if (
        window.confirm(
          'You have unsaved changes! Are you sure you want to leave?'
        )
      ) {
        router.push(`/${username}/dashboard`)
      }
    } else {
      router.push(`/${username}/dashboard`)
    }
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0.5,
        bgcolor: '#1a237e', // indigo 900 (MUI Color)
        color: 'white',
      }}
    >
      <Tooltip title="Settings">
        <IconButton
          size="small"
          color="inherit"
          sx={{p: 0.5}}
        >
          <SettingsIcon
            fontSize="inherit"
            color="inherit"
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Go to dashboard">
        <IconButton
          size="small"
          color="inherit"
          sx={{p: 0.5}}
          onClick={goToDashboard}
        >
          <HomeIcon
            fontSize="inherit"
            color="inherit"
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Preview">
        <IconButton
          size="small"
          color="inherit"
          sx={{p: 0.5}}
        >
          <RemoveRedEyeIcon
            fontSize="inherit"
            color="inherit"
          />
        </IconButton>
      </Tooltip>

      <Tooltip title="Reset Canvas to Default">
        <IconButton
          size="small"
          color="inherit"
          sx={{p: 0.5}}
          onClick={resetToDefaultTemplate}
        >
          <HistoryIcon
            fontSize="inherit"
            color="inherit"
          />
        </IconButton>
      </Tooltip>

      <Tooltip title="Import Starter Template">
        <IconButton
          size="small"
          color="inherit"
          sx={{p: 0.5}}
          // onClick={setStarterTemplate}
        >
          <DownloadIcon
            fontSize="inherit"
            color="inherit"
          />
        </IconButton>
      </Tooltip>

      <DevicePreview />

      <Button
        size="small"
        variant="contained"
        disableElevation
        sx={{
          p: 0,
          bgcolor: 'green',
          textTransform: 'capitalize',
        }}
        onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  )
}
