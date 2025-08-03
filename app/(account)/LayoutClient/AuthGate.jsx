'use client'

import {useSelector} from 'react-redux'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'

export default function AuthGate({children}) {
  const isLoggedIn = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.role)
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isLoggedIn || role !== 'retailer') router.replace('/')
    else setReady(true)
  }, [isLoggedIn, router])

  return ready ? children : null
}
