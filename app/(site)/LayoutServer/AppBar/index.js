import {Box, AppBar as MuiAppBar, Toolbar} from '@mui/material'
import HideAppBar from '../../LayoutClient/AppBar/HideAppBar'
import Section from '@/components/Section'
import PrimaryMenu from './PrimaryMenu'
import SecondaryMenu from './SecondaryMenu'
import Logo from '@/components/Logo'

const primaryToolbarMinHeight = '45px !important'
const secondaryToolbarMinHeight = '35px !important'
const blankToolbarMinHeight = {xs: '85px !important', md: '83px !important'} // Extra 5px(xs) and 3px(md) is for internal padding

export default function AppBar() {
  return (
    <>
      <HideAppBar>
        <MuiAppBar
          component="nav"
          sx={{
            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Toolbar
            sx={{
              p: '0 !important',
              bgcolor: 'background.default',
              minHeight: primaryToolbarMinHeight,
            }}
          >
            <Section
              component="div"
              sx={{display: 'flex', alignItems: 'center'}}
            >
              <Box sx={{display: 'flex', flexGrow: 1}}>
                <Logo />
              </Box>

              <PrimaryMenu />
            </Section>
          </Toolbar>

          <Toolbar
            sx={{
              p: '0 !important',
              bgcolor: 'background.paper',
              minHeight: secondaryToolbarMinHeight,
            }}
          >
            <Section
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <SecondaryMenu />
            </Section>
          </Toolbar>
        </MuiAppBar>
      </HideAppBar>

      <Toolbar
        id="back-to-top-anchor"
        sx={{minHeight: blankToolbarMinHeight, mb: 0.5}}
      />
    </>
  )
}
