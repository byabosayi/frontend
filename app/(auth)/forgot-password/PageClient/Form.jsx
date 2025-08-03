'use client'

import GlobalForm from '@/components/Form'
import api from '@/libs/axios'
import {setAuth} from '@/libs/redux/slices/auth'
import {setSnackbar} from '@/libs/redux/slices/global'
import {useLocale} from 'next-intl'
import {useRouter, useSearchParams} from 'next/navigation'
import {useDispatch} from 'react-redux'

const formInputFields = [
  {
    id: 'email',
    label: 'Email',
    type: 'email',
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
  // const dispatch = useDispatch()
  // const locale = useLocale()
  // const searchParams = useSearchParams()
  // const router = useRouter()

  const register = async (values, actions) => {}

  return (
    <GlobalForm
      submitBtnTitle="Send Reset Link"
      fields={formInputFields}
      onSubmit={register}
    />
  )
}
