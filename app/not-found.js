import Section from '@/components/Section'
import {Box, Button, Typography} from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Section
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
      }}
    >
      <Box sx={{textAlign: 'center'}}>
        <Typography
          variant="h1"
          sx={{lineHeight: 1}}
        >
          404
        </Typography>

        <Typography
          variant="h6"
          sx={{lineHeight: 1}}
        >
          Oops! Page Not Found.
        </Typography>

        <Button
          variant="contained"
          sx={{mt: 2}}
          component={Link}
          href="/"
        >
          Go Home
        </Button>
      </Box>
    </Section>
  )
}
