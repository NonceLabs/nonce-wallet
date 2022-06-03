import { createSlice } from '@reduxjs/toolkit'
import { Wallet, Chain } from 'types'

interface WalletSlice {
  list: Wallet[]
  current: Wallet | undefined
}

const initialState: WalletSlice = {
  list: [],
  current: undefined,
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addAccount: (state, action) => {
      if (!state.list) {
        state.list = []
      }
      state.list.push(action.payload)
      state.current = action.payload
    },
    setCurrent: (state, action) => {
      state.current = action.payload
    },
    restore: (state, action) => {
      state.list = action.payload
      if (state.list.length) {
        if (!state.current) {
          state.current = state.list[0]
        }
      } else {
        state.current = undefined
      }
    },
  },
})

export const {} = walletSlice.actions

export default walletSlice.reducer
