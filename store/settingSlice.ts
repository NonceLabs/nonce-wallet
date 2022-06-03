import { createSlice } from '@reduxjs/toolkit'
import { Chain, Contact, Currency, CurrencyRate, NetworkType } from 'types'

interface SettingSlice {
  theme: string
  currencyRates: CurrencyRate
  currentCurrency: Currency
  network: NetworkType
  pincode: string
  bioAuthEnabled: boolean
  pushToken: string
  isDevMode: boolean
  contacts: Contact[]
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
  contacts: [],
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
    addContact: (state, action) => {
      state.contacts.push(action.payload)
    },
  },
})

export const { updateTheme } = settingSlice.actions

export default settingSlice.reducer
