import Link from 'next/link'
import Card from './Card'
import {useTranslations} from 'next-intl'
import {Box, Button, Typography} from '@mui/material'
import {SearchOff} from '@mui/icons-material'
import {memo} from 'react'

export default memo(function NoResultCard({title, href, hrefTitle}) {
  const t = useTranslations('global')

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}
    >
      <Box sx={{textAlign: 'center'}}>
        <SearchOff
          sx={{
            fontSize: {xs: 30, md: 40},
            mb: 1,
          }}
        />
        <Typography sx={{mb: 1}}>
          {title ? title : t('no_results_found')}
        </Typography>
        {href && (
          <Button
            variant="contained"
            component={Link}
            href={href}
          >
            {hrefTitle ? hrefTitle : t('see_another')}
          </Button>
        )}
      </Box>
    </Card>
  )
})
