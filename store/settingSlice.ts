import { createSlice } from '@reduxjs/toolkit'
import { Currency, CurrencyRate, NetworkType } from 'types'

interface SettingSlice {
  theme: string
  currencyRates: CurrencyRate
  currentCurrency: Currency
  network: NetworkType
  pincode: string
  bioAuthEnabled: boolean
  pushToken: string
  isDevMode: boolean
}

const initialState: SettingSlice = {
  theme: 'auto',
  currencyRates: {
    USD: 1,
  },
  currentCurrency: Currency.USD,
  network: NetworkType.MAINNET,
  pincode: '',
  bioAuthEnabled: false,
  pushToken: '',
  isDevMode: false,
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload
    },
    setupPINCode: (state, action) => {
      state.pincode = action.payload
    },
    updateBioAuth: (state, action) => {
      state.bioAuthEnabled = action.payload
    },
    updateCurrentCurrency: (state, action) => {
      state.currentCurrency = action.payload
    },
  },
})

export const { updateTheme } = settingSlice.actions

export default settingSlice.reducer
