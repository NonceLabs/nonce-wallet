import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import useColorScheme from 'hooks/useColorScheme'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

import LinkingConfiguration from './LinkingConfiguration'
import RootNavigator from './RootNavigator'
import { useAppDispatch } from 'store/hooks'
import WalletAPI from 'chain/WalletAPI'
import { Chain } from 'types'

export default function Navigation() {
  const theme = useColorScheme()
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function initAccounts() {
      try {
        const minas = await WalletAPI.getAccounts(Chain.MINA)
        dispatch({
          type: 'account/restore',
          payload: minas,
        })
      } catch (error) {}
    }
    initAccounts()
  }, [])

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  )
}
