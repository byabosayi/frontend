'use client'

import {useState, useRef, memo, useCallback} from 'react'
import {
  Box,
  ClickAwayListener,
  Paper,
  Popper as MuiPopper,
  useMediaQuery,
} from '@mui/material'
import Card from './Card'

export default memo(function Popper({children, elId, title, keepOpen = false}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenu, setOpenMenu] = useState(null)
  const mdAndDown = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const popperRef = useRef(null)

  const handleToggle = useCallback(
    (event) => {
      event.stopPropagation()
      setAnchorEl((prev) => (openMenu === elId ? null : event.currentTarget))
      setOpenMenu((prev) => (openMenu === elId ? null : elId))
    },
    [openMenu, elId]
  )

  const handleOpen = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget)
      setOpenMenu(elId)
    },
    [elId]
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
    setOpenMenu(null)
  }, [])

  return mdAndDown ? (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{display: 'flex', my: 'auto'}}>
        <Box
          sx={{display: 'flex', my: 'auto'}}
          onClick={handleToggle}
        >
          {title}
        </Box>
        <MuiPopper
          ref={popperRef}
          open={openMenu === elId}
          anchorEl={anchorEl}
          sx={{
            zIndex: (theme) => theme.zIndex.appBar + 1,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              mt: 1,
              minWidth: 200,
              maxWidth: 400,
            }}
            onClick={!keepOpen ? handleClose : null}
          >
            <Card sx={{p: 1}}>{children}</Card>
          </Paper>
        </MuiPopper>
      </Box>
    </ClickAwayListener>
  ) : (
    <Box
      sx={{display: 'flex', my: 'auto'}}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      {title}
      <MuiPopper
        open={openMenu === elId}
        anchorEl={anchorEl}
        sx={{
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            mt: 1,
            minWidth: 200,
            maxWidth: 400,
          }}
          onClick={!keepOpen ? handleClose : null}
        >
          <Card sx={{p: 1}}>{children}</Card>
        </Paper>
      </MuiPopper>
    </Box>
  )
})
