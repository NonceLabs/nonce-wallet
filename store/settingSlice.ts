import { createSlice } from '@reduxjs/toolkit'
import { Currency, CurrencyRate, NetworkType } from 'types'

interface SettingSlice {
  theme: string
  currencyRates: CurrencyRate
  currentCurrency: Currency
  network: NetworkType
  password: string
}

const initialState: SettingSlice = {
  theme: 'auto',
  currencyRates: {
    USD: 1,
  },
  currentCurrency: Currency.USD,
  network: NetworkType.MAINNET,
  password: '',
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload
    },
    setupPswd: (state, action) => {
      state.password = action.payload
    },
  },
})

export const { updateTheme } = settingSlice.actions

export default settingSlice.reducer
