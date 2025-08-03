import Card from '@/components/Card'
import Section from '@/components/Section'
import {Box, Typography} from '@mui/material'

export default function Page() {
  return (
    <Section sx={{minHeight: '100vh'}}>
      <Card
        sx={{
          minHeight: '30vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{textAlign: 'center'}}>
          <Typography
            variant="subtitle1"
            sx={{mt: 1}}
          >
            Coming Soon
          </Typography>
        </Box>
      </Card>
    </Section>
  )
}
