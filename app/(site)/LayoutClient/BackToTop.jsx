'use client'

import {KeyboardArrowUp} from '@mui/icons-material'
import {Box, Fab, Fade, useScrollTrigger} from '@mui/material'

function ScrollTop(props) {
  const {children, window} = props

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    )

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      })
    }
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{position: 'fixed', bottom: 16, right: 16}}
      >
        {children}
      </Box>
    </Fade>
  )
}

export default function BackToTop() {
  return (
    <ScrollTop>
      <Fab
        size="small"
        aria-label="scroll back to top"
        sx={{
          bgcolor: 'background.paper',
          boxShadow: '0px 5px 10px -0.5px rgba(0,0,0,0.2)',
        }}
      >
        <KeyboardArrowUp sx={{color: 'primary.main', fontSize: '1.8rem'}} />
      </Fab>
    </ScrollTop>
  )
}
