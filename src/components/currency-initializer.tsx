'use client'
import { localCurrencyAtom } from '@/store/currency-atom'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

export default function CurrencyInitializer() {

  const initializeCurrency = useSetAtom(localCurrencyAtom)

  useEffect(() => {
    initializeCurrency()
  }, [initializeCurrency])

  return null
}

