import { createSlice } from '@reduxjs/toolkit'
import { Account, Chain } from 'types'

interface AccountSlice {
  list: Account[]
  current: Account | null
}

const default_account = {
  publicKey: 'B62qor3MfNXwrPyAjfP3f3cWzxwntsKfSMrcRVD7SxqQKa5qW1aJbGV',
  chain: Chain.MINA,
}

const initialState: AccountSlice = {
  list: [],
  current: null,
}

export const accountSlice = createSlice({
  name: 'account',
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
        state.current = null
      }
    },
  },
})

export const {} = accountSlice.actions

export default accountSlice.reducer
