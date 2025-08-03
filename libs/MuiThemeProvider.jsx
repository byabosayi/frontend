'use client'

import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  responsiveFontSizes,
} from '@mui/material'
import {createContext, useContext, useMemo, useState, useEffect} from 'react'
import json from '@/json/ui/mui-theme'

const CustomizeTheme = (mode) =>
  responsiveFontSizes(
    createTheme({
      breakpoints: json.breakpoints,
      palette: {
        mode,
        ...(mode === 'light' ? json.colors.light : json.colors.dark),
      },
      typography: json.typography,
    })
  )

const ColorModeCtx = createContext({toggle: () => {}})
export const useColorMode = () => useContext(ColorModeCtx)

export function MuiThemeProvider({children}) {
  /* 1️⃣  SSR-safe deterministic initial value */
  const [mode, setMode] = useState('light')
  const [ready, setReady] = useState(false) // to avoid flash with MUI v7

  /* 2️⃣  After hydration, sync with localStorage */
  useEffect(() => {
    const saved = localStorage.getItem('mui-mode') || 'light'
    setMode(saved)
    setReady(true)
  }, [])

  /* 3️⃣  Toggle stores only in localStorage */
  const colorMode = useMemo(
    () => ({
      toggle() {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light'
          localStorage.setItem('mui-mode', next)
          return next
        })
      },
    }),
    []
  )

  const theme = useMemo(() => CustomizeTheme(mode), [mode])

  /* 4️⃣  Optional: render nothing until theme matches saved value */
  if (!ready) return null // prevents initial flash at cost of 1-frame blank

  return (
    <ColorModeCtx.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ColorModeCtx.Provider>
  )
}
