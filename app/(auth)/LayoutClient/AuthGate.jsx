'use client'

import {useSelector} from 'react-redux'
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'

export default function AuthGate({children}) {
  const isLoggedIn = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.role)
  const router = useRouter()
  const searchParams = useSearchParams()
  const URLParams = new URLSearchParams(searchParams)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      const destPath = searchParams.get('redirect')
      if (destPath) {
        URLParams.delete('redirect')

        const query = URLParams.toString()
        const slash = destPath.startsWith('/') ? '' : '/'
        const full = query
          ? `${slash}${destPath}?${query}`
          : `${slash}${destPath}`

        router.replace(full) // DONE ✅
      } else {
        if (role === 'admin') {
          router.replace('/admin')
        } else {
          router.replace('/dashboard')
        }
      }
    } else setReady(true)
  }, [isLoggedIn, router])

  return ready ? children : null
}
