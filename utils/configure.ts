import { Platform } from 'react-native'
import { Currency } from 'types'

export const DEFAULT_CURRENCY_RATE = {
  [Currency.CNY]: 6.734698,
  [Currency.EUR]: 0.94989,
  [Currency.USD]: 1,
}

export const CURRENCY_SYMBOL = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.CNY]: '¥',
}

export const IGNORE_APP_STORE = Platform.OS === 'android'

export const MNEMONIC_STRENGTH = 128
