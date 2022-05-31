import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './accountSlice'
import assetSlice from './assetSlice'
import settingSlice from './settingSlice'

export const store = configureStore({
  reducer: {
    setting: settingSlice,
    account: accountSlice,
    asset: assetSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
