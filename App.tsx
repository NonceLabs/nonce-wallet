import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
// import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Host } from 'react-native-portalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import './shim'
import './locale'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import { toastConfig } from './components/common/ToastConfig'
import { store } from './store'

import Client from 'mina-signer'
const client = new Client({ network: 'mainnet' })

// Generate keys
let keypair = client.genKeys()
// console.log('keypair', keypair)

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <SafeAreaProvider>
            <Host>
              <Navigation />
              <Toast config={toastConfig} />
            </Host>
          </SafeAreaProvider>
          {/* </PersistGate> */}
        </Provider>
      </GestureHandlerRootView>
    )
  }
}
