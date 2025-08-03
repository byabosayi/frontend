'use client'

import {useDispatch, useSelector} from 'react-redux'
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'
import {setSnackbar} from '@/libs/redux/slices/global'

export default function AuthGate({children}) {
  const isLoggedIn = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'অর্ডার কনফার্মের জন্য লগিন করতে হবে',
          serverity: 'info',
        })
      )

      const qs = searchParams.toString() // "" when there are no params
      router.replace(`/login?redirect=checkout${qs ? `&${qs}` : ''}`)
    } else setReady(true)
  }, [isLoggedIn, router])

  return ready ? children : null
}
