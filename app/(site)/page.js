import Card from '@/components/Card'
import Section from '@/components/Section'
import {Box, Button, Typography} from '@mui/material'
import Link from 'next/link'

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
          <Typography variant="h3">
            All-in-One AI Driven Smart B2B Marketplace.
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{mt: 1}}
          >
            Wholesale Products | Auctions | Free Website | Dropshipping | AI CMS
          </Typography>

          <Button
            variant="outlined"
            sx={{mt: 2}}
            component={Link}
            href="/register"
          >
            Get Started Now
          </Button>
        </Box>
      </Card>
    </Section>
  )
}
