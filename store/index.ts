import { configureStore } from '@reduxjs/toolkit'
import settingSlice from './settingSlice'

export const store = configureStore({
  reducer: {
    setting: settingSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
