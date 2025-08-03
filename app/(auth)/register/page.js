import Form from './PageClient/Form'
import {Button, Stack, Typography} from '@mui/material'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Typography
        variant="h5"
        sx={{textAlign: 'center', mb: 4, fontWeight: 'medium'}}
      >
        Register
      </Typography>

      <Form />

      <Stack
        direction="row"
        spacing={1}
        sx={{mt: 2}}
      >
        <Button
          fullWidth
          size="small"
          component={Link}
          href="/login"
        >
          লগিনে ফিরে যান
        </Button>
      </Stack>
    </>
  )
}
