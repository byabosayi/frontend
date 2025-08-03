'use client'

import {useState} from 'react'
import {Box, Menu, MenuItem, IconButton, Tooltip} from '@mui/material'

import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import TabletMacIcon from '@mui/icons-material/TabletMac'
import {useEditor} from '@craftjs/core'

export default function DevicePreview() {
  const [device, setDevice] = useState('desktop')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const {actions} = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    device: state.options.device || 'desktop',
  }))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const selectDevice = (newDevice) => {
    setDevice(newDevice)

    actions.setOptions((opts) => {
      opts.device = newDevice
    })

    handleClose()
  }

  const getDeviceIcon = () => {
    switch (device) {
      case 'tablet':
        return (
          <TabletMacIcon
            fontSize="inherit"
            color="inherit"
          />
        )
      case 'mobile':
        return (
          <PhoneIphoneIcon
            fontSize="inherit"
            color="inherit"
          />
        )
      default:
        return (
          <DesktopMacOutlinedIcon
            fontSize="inherit"
            color="inherit"
          />
        )
    }
  }

  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Tooltip title="Device Preview">
        <IconButton
          onClick={handleClick}
          size="small"
          color="inherit"
          sx={{
            p: 0.5,
            // borderRadius: 1,
            // bgcolor: open ? 'action.selected' : 'transparent',
            // '&:hover': {
            //   bgcolor: 'action.hover',
            // },
          }}
        >
          {getDeviceIcon()}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={() => selectDevice('desktop')}
          selected={device === 'desktop'}
        >
          <DesktopMacOutlinedIcon
            fontSize="small"
            sx={{mr: 1}}
          />
          Desktop
        </MenuItem>
        <MenuItem
          onClick={() => selectDevice('tablet')}
          selected={device === 'tablet'}
        >
          <TabletMacIcon
            fontSize="small"
            sx={{mr: 1}}
          />
          Tablet
        </MenuItem>
        <MenuItem
          onClick={() => selectDevice('mobile')}
          selected={device === 'mobile'}
        >
          <PhoneIphoneIcon
            fontSize="small"
            sx={{mr: 1}}
          />
          Mobile
        </MenuItem>
      </Menu>
    </Box>
  )
}
