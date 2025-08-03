'use client'

import {Provider} from 'react-redux'
import {CreateStore} from './CreateStore'
import {useMemo} from 'react'

export function ReduxStoreProvider({children}) {
  const store = useMemo(() => CreateStore(), [])

  return <Provider store={store}>{children}</Provider>
}
