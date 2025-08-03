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
        Login
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
          href="/forgot-password"
        >
          পাসওয়ার্ড ভুলে গেছেন?
        </Button>

        <Button
          fullWidth
          size="small"
          component={Link}
          href="/register"
        >
          নতুন রেজিস্ট্রেশন করুন
        </Button>
      </Stack>
    </>
  )
}
