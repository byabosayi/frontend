'use client'

import api from '@/libs/axios'
import {Button, CircularProgress} from '@mui/material'
import {useLocale, useTranslations} from 'next-intl'
import Link from 'next/link'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {clearAuth} from '@/libs/redux/slices/auth'
import {setSnackbar} from '@/libs/redux/slices/global'

export default function MobileAccount() {
  const isLoggedIn = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const t = useTranslations('global.appbar')
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
        variant="contained"
        sx={{mb: 0.5}}
        component={Link}
        href="/dashboard"
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
        variant="contained"
        sx={{mb: 0.5}}
        component={Link}
        href="/login"
      >
        {t('login')}
      </Button>
      <Button
        fullWidth
        variant="contained"
        component={Link}
        href="/register"
      >
        {t('register')}
      </Button>
    </>
  )
}
