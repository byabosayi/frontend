'use client'

import {Box, Paper} from '@mui/material'
import {Frame, Element, useEditor} from '@craftjs/core'
import {useEffect, useState} from 'react'
import {getDeviceWidth} from '@/utils/responsive'
import RootContainer from '../nodes/global/RootContainer'
import QuickAddBar from '../QuickAddBar'
// import PrimaryHeader from './nodes/website/header/primary/Primary'
// import SecondaryHeader from './nodes/website/header/secondary/Secondary'

export default function ViewportHeader() {
  const [savedData, setSavedData] = useState(undefined) // undefined = not loaded yet

  const {device, isEditing} = useEditor((state) => ({
    device: state.options.device || 'desktop',
    isEditing: state.options.isEditing !== false,
  }))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSavedData(localStorage.getItem('craftjs-json-header') ?? null)
    }
  }, [])

  // wait until we've queried localStorage once
  if (savedData === undefined) return null // or a spinner

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'grey',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: getDeviceWidth(device),
          transition: 'width .2s ease',
          minHeight: '100%',
          bgcolor: 'background.paper',
          mx: 'auto',
          borderRadius: 0,
        }}
      >
        {savedData ? (
          <Frame json={savedData} />
        ) : (
          <Frame>
            <Element
              is={RootContainer}
              component="nav"
              canvas
            >
              {'<Element is={PrimaryHeader} />'}
              {'<Element is={SecondaryHeader} />'}
            </Element>
          </Frame>
        )}
        {isEditing && <QuickAddBar />}
      </Paper>
    </Box>
  )
}
