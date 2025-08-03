import AuthGate from './LayoutClient/AuthGate'
import Section from '@/components/Section'
import Card from '@/components/Card'
import {Box} from '@mui/material'
import Logo from '@/components/Logo'

export default function Layout({children}) {
  return (
    <AuthGate>
      <Section
        sx={{
          width: {xs: '100%', md: '50%', lg: '40%', xl: '30%', xxl: '25%'},
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90vh',
        }}
      >
        <Box>
          <Box sx={{mb: 3}}>
            <Logo />
          </Box>

          <Card sx={{px: {xs: 2, md: 4}, py: 4}}>{children}</Card>
        </Box>
      </Section>
    </AuthGate>
  )
}
