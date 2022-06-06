import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Host } from 'react-native-portalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import './shim'
import './locale'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import { store, persistor } from './store'
import { polyfillWebCrypto } from 'expo-standard-web-crypto'
import ToastMessage from 'components/common/ToastMessage'

polyfillWebCrypto()

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <Host>
                <Navigation />
                <ToastMessage />
              </Host>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    )
  }
}
