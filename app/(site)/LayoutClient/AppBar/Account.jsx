'use client'

import {Button, CircularProgress} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import Link from 'next/link'
import {useLocale, useTranslations} from 'next-intl'
import {useState} from 'react'
import {setSnackbar} from '@/libs/redux/slices/global'
import {clearAuth} from '@/libs/redux/slices/auth'
import api from '@/libs/axios'

export default function Account() {
  const isLoggedIn = useSelector((state) => state.auth.token)
  const t = useTranslations('global.appbar')

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const locale = useLocale()

  const logout = async () => {
    setLoading(true)
    dispatch(setSnackbar({open: false}))

    try {
      await api
        .post('logout')
        .then((res) => {
          dispatch(clearAuth())
          window.location.reload()
        })
        .catch((err) => {
          dispatch(
            setSnackbar({
              open: true,
              message: err?.response?.data?.message[locale],
              serverity: 'error',
            })
          )
        })
    } catch (err) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Something went wrong',
          serverity: 'error',
        })
      )
    }
    setLoading(false)
  }

  return isLoggedIn ? (
    <>
      <Button
        fullWidth
        component={Link}
        href="/dashboard"
        sx={{mb: 1}}
      >
        {t('account')}
      </Button>

      <Button
        fullWidth
        variant="contained"
        disabled={loading}
        onClick={logout}
      >
        {loading ? (
          <CircularProgress
            size={20}
            sx={{
              color: 'primary',
            }}
          />
        ) : (
          t('logout')
        )}
      </Button>
    </>
  ) : (
    <>
      <Button
        fullWidth
        component={Link}
        variant="contained"
        href="/login"
        sx={{mb: 1}}
      >
        {t('login')}
      </Button>

      <Button
        fullWidth
        component={Link}
        href="/register"
      >
        {t('register')}
      </Button>
    </>
  )
}
