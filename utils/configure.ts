import { Platform } from 'react-native'
import { Currency } from 'types'
import icons from './icons'

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

export const MINA_TOKEN = {
  name: 'MINA',
  balance: '0',
  icon: icons.MINA_TOKEN,
  price: 0,
  symbol: 'MINA',
  isNative: true,
  decimals: 9,
}

export const GAS_FEE_LEVELS = [
  {
    level: 'Slow',
    value: '0.001',
  },
  {
    level: 'Default',
    value: '0.01',
  },
  {
    level: 'Fast',
    value: '0.2',
  },
]
