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
  pincode: '111111',
  bioAuthEnabled: false,
  pushToken: '',
  isDevMode: false,
  contacts: [
    {
      publicKey: 'B62qnkfJEc2Q1ZPpFCnxX62ahJLvSuPbTUDuxwVhtk1rsHfrSLe3Fhq',
      name: 'Jack',
      chain: Chain.MINA,
    },
  ],
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
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (t) => t.publicKey !== action.payload.publicKey
      )
    },
    updateContact: (state, action) => {
      const { oldContact, newContact } = action.payload
      state.contacts = state.contacts.map((t) => {
        if (oldContact.publicKey === t.publicKey) {
          return newContact
        }
        return t
      })
    },
    updateDevMode: (state, action) => {
      state.isDevMode = action.payload
    },
    updateCurrencyRate: (state, action) => {
      state.currencyRates = { ...state.currencyRates, ...action.payload }
    },
  },
})

export const { updateTheme } = settingSlice.actions

export default settingSlice.reducer
