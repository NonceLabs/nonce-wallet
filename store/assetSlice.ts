import { createSlice } from '@reduxjs/toolkit'
import { Token } from 'types'
import { MINA_TOKEN } from 'utils/configure'

interface AssetSlice {
  tokens: Token[]
}

const initialState: AssetSlice = {
  tokens: [MINA_TOKEN],
}

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    updateNativeTokenBalance: (state, action) => {
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
