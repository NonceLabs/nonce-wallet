import { createSlice } from '@reduxjs/toolkit'
import { Wallet } from 'types'

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
    add: (state, action) => {
      if (!state.list) {
        state.list = []
      }
      state.list.push(action.payload)
      state.current = action.payload
    },
    remove: (state, action) => {
      state.list = state.list.filter(
        (t) => t.publicKey !== action.payload.publicKey
      )
      if (state.list.length > 0) {
        state.current = state.list[0]
      } else {
        state.current = undefined
      }
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
