'use client'

import {Box} from '@mui/material'
import Radio from '@/components/Radio'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'

export default function Language() {
  const [locale, setLocale] = useState('bn')
  const router = useRouter()

  const handleChange = async (e) => {
    setLocale(e.target.value)
    await localStorage.setItem('locale', e.target.value)
    document.cookie = `NEXT_LOCALE=${e.target.value}; path=/; max-age=31536000`

    /* 3️⃣  Tell Next.js to re-render on the server */
    router.refresh() // makes a new RSC request → new locale
  }

  useEffect(() => {
    setLocale(localStorage.getItem('locale') || 'bn')
  }, [])

  return (
    <Box>
      {locale === 'bn' ? 'ভাষা পরিবর্তন করুন' : 'Change Language'}
      <Radio
        name="locale"
        items={[
          {label: 'বাংলা', value: 'bn'},
          {label: 'English', value: 'en'},
        ]}
        value={locale}
        onChange={handleChange}
      />
    </Box>
  )
}
