'use client'

import GlobalForm from '@/components/Form'
import api from '@/libs/axios'
import {setAuth} from '@/libs/redux/slices/auth'
import {setSnackbar} from '@/libs/redux/slices/global'
import {useLocale} from 'next-intl'
import {useDispatch} from 'react-redux'

const formInputFields = [
  {
    id: 'email_phone_or_username',
    label: 'Email/Phone/Username',
    type: 'text',
    required: true,
    validations: [
      {
        type: 'required',
        params: ['Required'],
      },
    ],
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    validations: [
      {
        type: 'required',
        params: ['Required'],
      },
    ],
  },
]

export default function Form() {
  const dispatch = useDispatch()
  const locale = useLocale()

  const login = async (values, actions) => {
    dispatch(setSnackbar({open: false}))

    dispatch(
      setSnackbar({
        open: true,
        message: 'Have patience, we will be back soon',
        severity: 'success',
      })
    )

    return

    try {
      await api
        .post('login', values)
        .then((res) => {
          if (res.data?.token && res.data?.data) {
            const authData = {
              token: res.data.token,
              id: res.data.data.id,
              name: res.data.data.name,
              username: res.data.data.username,
              role: res.data.data.role,
              email: res.data.data.email,
            }

            dispatch(setAuth(authData))

            window.location.reload()
          }
        })
        .catch((err) => {
          dispatch(
            setSnackbar({
              open: true,
              message: err?.response?.data?.message?.[locale],
              severity: 'error',
            })
          )
        })
    } catch (err) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Something went wrong',
          severity: 'error',
        })
      )
    }

    actions.setSubmitting(false)
  }

  return (
    <GlobalForm
      submitBtnTitle="Login"
      fields={formInputFields}
      onSubmit={login}
    />
  )
}
