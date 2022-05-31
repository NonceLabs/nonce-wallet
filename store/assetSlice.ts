import { createSlice } from '@reduxjs/toolkit'
import { Token } from 'types'
import icons from 'utils/icons'

interface AssetSlice {
  tokens: Token[]
}

const initialState: AssetSlice = {
  tokens: [
    {
      name: 'MINA',
      balance: '0',
      icon: icons.MINA_TOKEN,
      price: 0,
      symbol: 'MINA',
      isNative: true,
      decimals: 24,
    },
  ],
}

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.tokens = state.tokens.map((t) => {
        if (t.isNative) {
          return { ...t, balance: action.payload }
        }
        return t
      })
    },
    updatePrice: (state, action) => {
      state.tokens = state.tokens.map((t) => {
        if (t.isNative) {
          return { ...t, price: action.payload }
        }
        return t
      })
    },

    updateLikelyTokens: (state, action) => {},
  },
})

export const {} = assetSlice.actions

export default assetSlice.reducer
