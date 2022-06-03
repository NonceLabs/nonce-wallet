import { configureStore } from '@reduxjs/toolkit'
import walletSlice from './walletSlice'
import assetSlice from './assetSlice'
import settingSlice from './settingSlice'

export const store = configureStore({
  reducer: {
    setting: settingSlice,
    wallet: walletSlice,
    asset: assetSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
