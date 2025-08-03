'use client'

import {Box, Button, Divider, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import {useSelector} from 'react-redux'
import Link from 'next/link'
import {useTranslations} from 'next-intl'
import Popper from '@/components/Popper'
import TextField from '@/components/TextField'
import {Fragment} from 'react'

const searchedItems = [
  // {title: 'Retaiter', route: '/retailer-username'},
  // {title: 'Retaiter 2', route: '/retailer-username-2'},
]

export default function CreateSite({children}) {
  const {role, username} = useSelector((state) => state.auth)
  const t = useTranslations('global')

  return (
    <>
      {role && role === 'retailer' && username ? (
        <Button
          component={Link}
          href={`/${username}`}
          variant="contained"
          sx={{
            mr: {xs: 0.3, md: 0.5},
            fontSize: {xs: '12px !important', md: '15px !important'},
            px: {xs: '5px !important', md: '10px !important'},
            letterSpacing: {xs: '0 !important', md: '0.5px !important'},
          }}
        >
          {t('appbar.edit_website')}
          <EditIcon sx={{fontSize: 'inherit', ml: 0.5}} />
        </Button>
      ) : (
        <Popper
          elId="create-free-website"
          keepOpen
          title={children}
        >
          <Box sx={{p: 1}}>
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              href="/register"
              sx={{
                mr: {xs: 0.3, md: 0.5},
                fontSize: {xs: '12px !important', md: '15px !important'},
                px: {xs: '5px !important', md: '10px !important'},
                letterSpacing: {xs: '0 !important', md: '0.5px !important'},
                mb: 2,
              }}
            >
              {t('appbar.create_new_website')}
            </Button>

            <Typography>{t('appbar.already_have_website')}</Typography>

            <TextField
              variant="outlined"
              label={t('appbar.search_website')}
              sx={{my: 1}}
            />

            {searchedItems && searchedItems.length > 0 ? (
              searchedItems.map((item, index) => (
                <Fragment key={index}>
                  <Box
                    component={Link}
                    href={item.route}
                  >
                    <Box
                      sx={{
                        '&:hover': {
                          bgcolor: 'rgba(0, 255, 85, 0.08) !important',
                        },
                        py: 0.5,
                      }}
                    >
                      <Typography>{item.title}</Typography>
                    </Box>
                  </Box>

                  {searchedItems.indexOf(item) !== searchedItems.length - 1 && (
                    <Divider sx={{my: 0.5}} />
                  )}
                </Fragment>
              ))
            ) : (
              <Typography
                variant="body2"
                sx={{my: 1}}
              >
                {t('no_results_found')}
              </Typography>
            )}
          </Box>
        </Popper>
      )}
    </>
  )
}
