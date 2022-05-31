import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './accountSlice'
import settingSlice from './settingSlice'

export const store = configureStore({
  reducer: {
    setting: settingSlice,
    account: accountSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
