'use client'

import {Slide, useScrollTrigger} from '@mui/material'

function HideOnScroll(props) {
  const {children, window} = props

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  })

  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
    >
      {children ?? <div />}
    </Slide>
  )
}

export default function HideAppBar({children}) {
  return <HideOnScroll>{children}</HideOnScroll>
}
