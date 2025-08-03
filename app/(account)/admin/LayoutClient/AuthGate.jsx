'use client'

import {useSelector} from 'react-redux'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'

export default function AuthGate({children}) {
  const role = useSelector((state) => state.auth.role)
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (role !== 'admin') router.replace('/')
    else setReady(true)
  }, [role, router])

  return ready ? children : null
}
