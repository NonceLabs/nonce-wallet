import { createSlice } from '@reduxjs/toolkit'
import { Currency, CurrencyRate, NetworkType } from 'types'

interface SettingSlice {
  theme: string
  currencyRates: CurrencyRate
  currentCurrency: Currency
  network: NetworkType
}

const initialState: SettingSlice = {
  theme: 'auto',
  currencyRates: {
    USD: 1,
  },
  currentCurrency: Currency.USD,
  network: NetworkType.MAINNET,
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { updateTheme } = settingSlice.actions

export default settingSlice.reducer
