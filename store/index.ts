import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import walletSlice from './walletSlice'
import assetSlice from './assetSlice'
import settingSlice from './settingSlice'

const persistConfig = {
  key: 'Nonce',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  setting: settingSlice,
  wallet: walletSlice,
  asset: assetSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
